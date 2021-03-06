import pathUtil from 'path'
import {
	EventContract,
	EventSignature,
	PermissionContract,
	SpruceSchemas,
	validateEventContract,
} from '@sprucelabs/mercury-types'
import { Schema } from '@sprucelabs/schema'
import {
	eventResponseUtil,
	eventDiskUtil,
	eventNameUtil,
	buildEmitTargetAndPayloadSchema,
	eventContractUtil,
} from '@sprucelabs/spruce-event-utils'
import { diskUtil, namesUtil } from '@sprucelabs/spruce-skill-utils'
import globby from 'globby'
import { cloneDeep } from 'lodash'
import SpruceError from '../../../errors/SpruceError'
import AbstractStore from '../../../stores/AbstractStore'
import { InternalUpdateHandler } from '../../../types/cli.types'
import { eventContractCleanerUtil } from '../../../utilities/eventContractCleaner.utility'

export interface EventStoreFetchEventContractsResponse {
	errors: SpruceError[]
	contracts: EventContract[]
}

type Options = Omit<
	EventSignature,
	| 'responsePayloadSchema'
	| 'emitPayloadSchema'
	| 'listenPermissionContract'
	| 'emitPermissionContract'
>

interface EventImport {
	options?: Options
	emitPayload?: Schema
	emitTarget?: Schema
	responsePayload?: Schema
	emitPermissions?: PermissionContract
	listenPermissions?: PermissionContract
}

const eventFileNamesImportKeyMap = {
	'event.options.ts': { key: 'options', isSchema: false },
	'emitPayload.builder.ts': { key: 'emitPayload', isSchema: true },
	'emitTarget.builder.ts': { key: 'emitTarget', isSchema: true },
	'responsePayload.builder.ts': { key: 'responsePayload', isSchema: true },
	'emitPermissions.builder.ts': { key: 'emitPermissions', isSchema: false },
	'listenPermissions.builder.ts': { key: 'listenPermissions', isSchema: false },
}

export default class EventStore extends AbstractStore {
	public name = 'event'
	protected static contractCache: any

	public async fetchEventContracts(options?: {
		localNamespace?: string
		didUpdateHandler?: InternalUpdateHandler
	}): Promise<EventStoreFetchEventContractsResponse> {
		const { localNamespace, didUpdateHandler } = options ?? {}

		const contracts = await this.fetchRemoteContracts()

		didUpdateHandler?.('Pulling remote contracts...')

		const localContract =
			localNamespace &&
			(await this.loadLocalContract(localNamespace, didUpdateHandler))

		if (localNamespace) {
			this.filterOutLocalEventsFromRemoteContractsMutating(
				contracts,
				localNamespace
			)
		}

		if (localContract) {
			contracts.push(localContract)
		}

		return {
			contracts,
			errors: [],
		}
	}

	public static clearCache() {
		EventStore.contractCache = null
	}

	private async fetchRemoteContracts() {
		if (!EventStore.contractCache) {
			const client = await this.connectToApi({ shouldAuthAsCurrentSkill: true })
			const results = await client.emit('get-event-contracts::v2020_12_25')
			const { contracts } = eventResponseUtil.getFirstResponseOrThrow(results)
			EventStore.contractCache = contracts
		}

		return cloneDeep(EventStore.contractCache)
	}

	private filterOutLocalEventsFromRemoteContractsMutating(
		remoteContracts: EventContract[],
		localNamespace: string
	) {
		const ns = namesUtil.toKebab(localNamespace)

		for (const contract of remoteContracts) {
			const sigs = eventContractUtil.getNamedEventSignatures(contract)
			for (const sig of sigs) {
				if (sig.eventNamespace === ns) {
					delete contract.eventSignatures[sig.fullyQualifiedEventName]
				}
			}
		}
	}

	public async loadLocalContract(
		localNamespace: string,
		didUpdateHandler?: InternalUpdateHandler
	): Promise<EventContract | null> {
		const localMatches = await globby(
			diskUtil.resolvePath(
				this.cwd,
				'src',
				'events',
				'**/*.(builder|options).ts'
			)
		)

		const ns = namesUtil.toKebab(localNamespace)
		const eventSignatures: Record<string, EventSignature> = {}
		const importsByName: Record<string, EventImport> = {}

		didUpdateHandler?.(
			`Importing of ${localMatches.length} local event signature files...`
		)

		await Promise.all(
			localMatches.map(async (match) => {
				let fqen: string | undefined
				let key: keyof EventImport | undefined

				try {
					const { eventName, version } = eventDiskUtil.splitPathToEvent(match)
					fqen = eventNameUtil.join({
						eventName,
						version,
						eventNamespace: ns,
					})

					const filename = pathUtil.basename(
						match
					) as keyof typeof eventFileNamesImportKeyMap

					const map = eventFileNamesImportKeyMap[filename]

					if (map) {
						//@ts-ignore
						key = map.key
						if (!importsByName[fqen]) {
							importsByName[fqen] = {}
						}

						if (map.isSchema) {
							const importer = this.Service('schema')
							//@ts-ignore
							importsByName[fqen][map.key] = await importer.importSchema(match)
						} else {
							const importer = this.Service('import')
							//@ts-ignore
							importsByName[fqen][map.key] = await importer.importDefault(match)
						}
					}
				} catch (err) {
					throw new SpruceError({
						code: 'INVALID_EVENT_CONTRACT',
						fullyQualifiedEventName: fqen ?? 'Bad event name',
						brokenProperty: key ?? '*** major failure ***',
						originalError: err,
					})
				}
			})
		)

		Object.keys(importsByName).forEach((fqen) => {
			const imported = importsByName[fqen]
			const { eventName } = eventNameUtil.split(fqen)
			eventSignatures[fqen] = {
				emitPayloadSchema: buildEmitTargetAndPayloadSchema({
					eventName,
					payloadSchema: imported.emitPayload,
					targetSchema: imported.emitTarget,
				}),
				responsePayloadSchema: imported.responsePayload,
				emitPermissionContract: imported.emitPermissions,
				listenPermissionContract: imported.listenPermissions,
				...imported.options,
			}
		})

		didUpdateHandler?.(
			`Loaded ${Object.keys(eventSignatures).length} local event signatures...`
		)

		if (Object.keys(eventSignatures).length > 0) {
			const cleaned = eventContractCleanerUtil.cleanPayloadsAndPermissions({
				eventSignatures,
			})

			validateEventContract(cleaned)

			return cleaned
		}

		return null
	}

	public async registerEventContract(options: {
		eventContract: EventContract
	}) {
		const client = await this.connectToApi({ shouldAuthAsCurrentSkill: true })

		const results = await client.emit('register-events::v2020_12_25', {
			payload: {
				contract: options.eventContract,
			},
		})

		eventResponseUtil.getFirstResponseOrThrow(results)

		EventStore.contractCache = null

		return results
	}

	public async unRegisterEvents(
		options: SpruceSchemas.Mercury.v2020_12_25.UnregisterEventsEmitPayload
	) {
		const client = await this.connectToApi({ shouldAuthAsCurrentSkill: true })

		const results = await client.emit('unregister-events::v2020_12_25', {
			payload: options,
		})

		eventResponseUtil.getFirstResponseOrThrow(results)

		EventStore.contractCache = null
	}
}
