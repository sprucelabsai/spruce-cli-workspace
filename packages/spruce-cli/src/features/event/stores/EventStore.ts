import pathUtil from 'path'
import { EventContract, EventSignature } from '@sprucelabs/mercury-types'
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
import testUtil from '../../../tests/utilities/test.utility'

export interface EventStoreFetchEventContractsResponse {
	errors: SpruceError[]
	contracts: EventContract[]
}

export default class EventStore extends AbstractStore {
	public name = 'event'

	public async fetchEventContracts(options?: {
		localNamespace?: string
	}): Promise<EventStoreFetchEventContractsResponse> {
		testUtil.log('Connecting to api as skill')
		const client = await this.connectToApi({ shouldAuthAsCurrentSkill: true })

		testUtil.log('getting event contrcats')
		const results = await client.emit('get-event-contracts::v2020_12_25')
		testUtil.log('got event contracts')

		const { contracts } = eventResponseUtil.getFirstResponseOrThrow(results)

		testUtil.log('pulled contracts')

		testUtil.log('loading local contracts')
		const localContract =
			options?.localNamespace &&
			(await this.loadLocalContract(options.localNamespace))

		if (localContract) {
			contracts.push(localContract)
		}

		testUtil.log('done loading local contracts')
		return {
			contracts,
			errors: [],
		}
	}

	public async loadLocalContract(
		localNamespace: string
	): Promise<EventContract | null> {
		const localMatches = await globby(
			diskUtil.resolvePath(this.cwd, 'src', 'events', '**/*.builder.ts')
		)

		const ns = namesUtil.toKebab(localNamespace)

		const eventSignatures: Record<string, EventSignature> = {}
		const schemaImporter = this.Service('schema')
		const importer = this.Service('import')

		await Promise.all(
			localMatches.map(async (match: string) => {
				const { eventName, version } = eventDiskUtil.splitPathToEvent(match)

				const fullyQualifiedEventName = eventNameUtil.join({
					eventName,
					version,
					eventNamespace: ns,
				})

				if (!eventSignatures[fullyQualifiedEventName]) {
					eventSignatures[fullyQualifiedEventName] = {}
				}

				const filename = pathUtil.basename(match)
				let key: keyof EventSignature | undefined
				let isSchema = false

				switch (filename) {
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
}
