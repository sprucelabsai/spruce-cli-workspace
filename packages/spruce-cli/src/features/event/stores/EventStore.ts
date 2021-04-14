import pathUtil from 'path'
import {
	EventContract,
	EventSignature,
	SpruceSchemas,
} from '@sprucelabs/mercury-types'
import {
	eventResponseUtil,
	eventDiskUtil,
	eventNameUtil,
	buildEmitTargetAndPayloadSchema,
} from '@sprucelabs/spruce-event-utils'
import { diskUtil, namesUtil } from '@sprucelabs/spruce-skill-utils'
import globby from 'globby'
import SpruceError from '../../../errors/SpruceError'
import AbstractStore from '../../../stores/AbstractStore'

export interface EventStoreFetchEventContractsResponse {
	errors: SpruceError[]
	contracts: EventContract[]
}

export default class EventStore extends AbstractStore {
	public name = 'event'

	public async fetchEventContracts(options?: {
		localNamespace?: string
	}): Promise<EventStoreFetchEventContractsResponse> {
		const client = await this.connectToApi({ shouldAuthAsCurrentSkill: true })

		const results = await client.emit('get-event-contracts::v2020_12_25')

		const { contracts } = eventResponseUtil.getFirstResponseOrThrow(results)

		const localContract =
			options?.localNamespace &&
			(await this.loadLocalContract(options.localNamespace))

		if (localContract) {
			contracts.push(localContract)
		}

		return {
			contracts,
			errors: [],
		}
	}

	public async loadLocalContract(
		localNamespace: string
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

		await Promise.all(
			localMatches.map(async (match: string) => {
				const schemaImporter = this.Service('schema')
				const importer = this.Service('import')

				let key: keyof EventSignature | undefined
				let fullyQualifiedEventName: string | undefined
				try {
					const { eventName, version } = eventDiskUtil.splitPathToEvent(match)

					fullyQualifiedEventName = eventNameUtil.join({
						eventName,
						version,
						eventNamespace: ns,
					})

					if (!eventSignatures[fullyQualifiedEventName]) {
						eventSignatures[fullyQualifiedEventName] = {}
					}

					const filename = pathUtil.basename(match)
					let isSchema = false

					switch (filename) {
						case 'event.options.ts': {
							const options = await importer.importDefault(match)

							eventSignatures[fullyQualifiedEventName] = {
								...eventSignatures[fullyQualifiedEventName],
								...options,
							}
							break
						}
						case 'emitPayload.builder.ts':
							key = 'emitPayloadSchema'
							isSchema = true
							break
						case 'responsePayload.builder.ts':
							key = 'responsePayloadSchema'
							isSchema = true
							break
						case 'emitPermissions.builder.ts':
							key = 'emitPermissionContract'
							break
						case 'listenPermissions.builder.ts':
							key = 'listenPermissionContract'
							break
					}

					if (key) {
						if (key === 'emitPayloadSchema') {
							const schema = await schemaImporter.importSchema(match)
							const targetAndPayload = buildEmitTargetAndPayloadSchema({
								emitPayloadSchema: schema,
								eventName,
							})
							//@ts-ignore
							targetAndPayload.version = version

							//@ts-ignore
							eventSignatures[fullyQualifiedEventName][key] = targetAndPayload
						} else if (isSchema) {
							//@ts-ignore
							eventSignatures[fullyQualifiedEventName][
								key
							] = await schemaImporter.importSchema(match)
							//@ts-ignore
							eventSignatures[fullyQualifiedEventName][key].version = version
						} else {
							//@ts-ignore
							eventSignatures[fullyQualifiedEventName][
								key
							] = await importer.importDefault(match)
						}
					}
				} catch (err) {
					throw new SpruceError({
						code: 'INVALID_EVENT_CONTRACT',
						fullyQualifiedEventName:
							fullyQualifiedEventName ?? '** bad event name **',
						brokenProperty: key ?? '** never got to first key **',
						originalError: err,
					})
				}
			})
		)
		if (Object.keys(eventSignatures).length > 0) {
			return {
				eventSignatures,
			}
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

		return results
	}

	public async unRegisterEvents(
		options: SpruceSchemas.MercuryApi.v2020_12_25.UnregisterEventsEmitPayload
	) {
		const client = await this.connectToApi({ shouldAuthAsCurrentSkill: true })

		const results = await client.emit('unregister-events::v2020_12_25', {
			payload: options,
		})

		eventResponseUtil.getFirstResponseOrThrow(results)
	}
}
