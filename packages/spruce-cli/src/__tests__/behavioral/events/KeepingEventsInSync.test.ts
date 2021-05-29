import pathUtil from 'path'
import {
	buildPermissionContract,
	coreEventContracts,
	EventContract,
	SpruceSchemas,
	validateEventContract,
} from '@sprucelabs/mercury-types'
import { validateSchema } from '@sprucelabs/schema'
import {
	buildEmitTargetAndPayloadSchema,
	eventContractUtil,
} from '@sprucelabs/spruce-event-utils'
import {
	diskUtil,
	MERCURY_API_NAMESPACE,
	namesUtil,
	versionUtil,
} from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import EventFeature from '../../../features/event/EventFeature'
import { generateEventContractFileName } from '../../../features/event/writers/EventWriter'
import { FeatureActionResponse } from '../../../features/features.types'
import AbstractEventTest from '../../../tests/AbstractEventTest'
import testUtil from '../../../tests/utilities/test.utility'

const EXPECTED_NUM_CONTRACTS_GENERATED = 40

const coreContract = eventContractUtil.unifyContracts(
	coreEventContracts
) as SpruceSchemas.Mercury.v2020_09_01.EventContract

export default class KeepingEventsInSyncTest extends AbstractEventTest {
	private static randomVersion = 'v2020_01_01'

	private static get mercuryVersion() {
		return versionUtil.generateVersion('2020-12-25')
	}

	private static get todaysVersion() {
		return versionUtil.generateVersion()
	}

	@test()
	protected static async hasSyncEventsAction() {
		await this.Cli()
		assert.isFunction(this.Action('event', 'sync').execute)
	}

	@test.only()
	protected static async syncsWithoutSavingCoreEventsByDefault() {
		await this.FeatureFixture().installCachedFeatures('eventsInNodeModule')

		const results = await this.Action('event', 'sync').execute({})

		assert.isFalsy(results.errors)

		this.assertCoreFilesSavedToDisk(results, false)
		this.assertExpectedPayloadSchemasAreCreated(results, false)

		await this.assertCombinedContractContents(results)
	}

	@test()
	protected static async canSyncMercuryEventsWhenSpecifyingTheNamespace() {
		await this.FeatureFixture().installCachedFeatures('eventsInNodeModule')

		const results = await this.Action('event', 'sync').execute({
			namespace: 'mercury',
		})

		assert.isFalsy(results.errors)

		this.assertCoreFilesSavedToDisk(results, true)

		this.assertExpectedPayloadSchemasAreCreated(results)

		await this.assertCombinedContractContents(results)
	}

	@test()
	protected static async syncingSchemasRetainsEventPayloadSchemas() {
		await this.FeatureFixture().installCachedFeatures('events')
		const results = await this.Action('schema', 'sync').execute({
			namespace: 'mercury',
		})

		this.assertExpectedPayloadSchemasAreCreated(results)
	}

	@test()
	protected static async syncingSchemasWithBrokenConnectionStopsWithError() {
		const cli = await this.FeatureFixture().installCachedFeatures('events')

		const results = await this.Action('schema', 'sync').execute({
			namespace: 'mercury',
		})

		const match = testUtil.assertsFileByNameInGeneratedFiles(
			'sendMessageEmitPayload.schema.ts',
			results.files
		)

		assert.isTrue(diskUtil.doesFileExist(match))

		const client = await this.MercuryFixture().connectToApi({
			shouldAuthAsCurrentSkill: true,
		})
		await client.disconnect()

		const eventFeature = cli.getFeature('event') as EventFeature
		const writer = eventFeature.EventContractBuilder()
		writer.clearCache()

		const results2 = await this.Action('schema', 'sync').execute({})

		assert.isTruthy(results2.errors)

		assert.isTrue(diskUtil.doesFileExist(match))
	}

	@test()
	protected static async syncingSchemasDoesNotSyncEventSchemasIfEventsNotInstalled() {
		await this.FeatureFixture().installCachedFeatures('schemas')
		const results = await this.Action('schema', 'sync').execute()

		assert.doesThrow(() => this.assertExpectedPayloadSchemasAreCreated(results))
	}

	@test()
	protected static async canGetNumberOfEventsBackFromHealthCheck() {
		const cli = await this.FeatureFixture().installCachedFeatures('events')

		const results = await this.Action('event', 'sync').execute({
			namespace: 'mercury',
		})

		assert.isFalsy(results.errors)

		await this.Service('build').build()

		const health = await cli.checkHealth({ isRunningLocally: false })

		assert.isTruthy(health.skill)
		assert.isFalsy(health.skill.errors)
		assert.isTruthy(health.event)
		assert.isEqual(health.event.status, 'passed')
		assert.isTruthy(health.event.contracts)

		const imported = await this.importCombinedContractsFile(results)

		assert.isLength(health.event.contracts, imported.length)
	}

	@test()
	protected static async syncsEventsFromOtherSkills() {
		const { skillFixture, skill2 } =
			await this.seedDummySkillRegisterCurrentSkillAndInstallToOrg()

		const eventName = `my-new-event::${this.todaysVersion.constValue}`
		const fqen = `${skill2.slug}.my-new-event::${this.todaysVersion.constValue}`

		await skillFixture.registerEventContract(skill2, {
			eventSignatures: {
				[eventName]: {
					emitPayloadSchema: buildEmitTargetAndPayloadSchema({
						eventName: 'my-new-event',
						payloadSchema: {
							id: 'myNewEventEmitPayloadId',
							fields: { onlyField: { type: 'text' } },
						},
					}),
					responsePayloadSchema: {
						id: 'myNewEventResponsePayloadId',
						fields: {},
					},
					emitPermissionContract: buildPermissionContract({
						id: 'myNewEventEmitPermissionContract',
						name: 'My new event emit permissionContract',
						permissions: [
							{
								id: 'can-emit',
								name: 'Can emit my new event',
							},
						],
					}),
					listenPermissionContract: buildPermissionContract({
						id: 'myNewEventListenPermissionContract',
						name: 'My new event listen permissionContract',
						permissions: [
							{
								id: 'can-listen',
								name: 'Can emit my new event',
							},
						],
					}),
				},
			},
		})

		const results = await this.Action('event', 'sync').execute({})

		const match = testUtil.assertsFileByNameInGeneratedFiles(
			`myNewEvent.${this.todaysVersion.dirValue}.contract.ts`,
			results.files
		)

		assert.doesInclude(
			match,
			`${namesUtil.toCamel(skill2.slug)}${pathUtil.sep}myNewEvent.${
				this.todaysVersion.dirValue
			}.contract.ts`
		)

		const contract = (await this.Service('import').importDefault(match)) as any
		const sig = eventContractUtil.getSignatureByName(contract, fqen)

		assert.isTruthy(sig.emitPayloadSchema)
		assert.isTruthy(
			//@ts-ignore
			sig.emitPayloadSchema.fields?.payload?.options?.schema?.id,
			'myNewEventEmitPayloadId'
		)
		assert.isTruthy(
			sig.responsePayloadSchema?.id,
			'myNewEventResponsePayloadId'
		)

		assert.isTruthy(sig.emitPermissionContract)
		assert.isEqual(
			sig.emitPermissionContract.id,
			'myNewEventEmitPermissionContract'
		)
		assert.isEqual(sig.emitPermissionContract.permissions[0].id, 'can-emit')
		assert.isTruthy(sig.listenPermissionContract)
		assert.isEqual(
			sig.listenPermissionContract.id,
			'myNewEventListenPermissionContract'
		)
		assert.isEqual(sig.listenPermissionContract.permissions[0].id, 'can-listen')
	}

	@test()
	protected static async twoSkillsWithSameEventCanBeSynced() {
		const { skill2, skillFixture, orgFixture, org } =
			await this.seedDummySkillRegisterCurrentSkillAndInstallToOrg()

		const skill3 = await skillFixture.seedDemoSkill({ name: 'a third skill' })

		await orgFixture.installSkillAtOrganization(skill3.id, org.id)

		const eventName = `my-new-event::${this.todaysVersion.constValue}`

		await skillFixture.registerEventContract(skill2, {
			eventSignatures: {
				[eventName]: {},
			},
		})

		await skillFixture.registerEventContract(skill3, {
			eventSignatures: {
				[eventName]: {},
			},
		})

		const results = await this.Action('event', 'sync').execute({})

		const contract = testUtil.assertsFileByNameInGeneratedFiles(
			'events.contract.ts',
			results.files
		)

		await this.Service('typeChecker').check(contract)
	}

	@test()
	protected static async skillWithSameEventNameButDifferentVersionsCanBeSynced() {
		const { skill2, skillFixture } =
			await this.seedDummySkillRegisterCurrentSkillAndInstallToOrg()

		const eventName = `my-new-event::${this.todaysVersion.constValue}`
		const eventName2 = `my-new-event::${this.randomVersion}`

		await skillFixture.registerEventContract(skill2, {
			eventSignatures: {
				[eventName]: {},
				[eventName2]: {},
			},
		})

		const results = await this.Action('event', 'sync').execute({})

		const contract = testUtil.assertsFileByNameInGeneratedFiles(
			'events.contract.ts',
			results.files
		)

		await this.Service('typeChecker').check(contract)
	}

	@test()
	protected static async unRegisteredEventsAreRemoved() {
		const { skillFixture, syncResults, skill2, contractFileName } =
			await this.registerAndSyncEvents()

		await this.assertValidActionResponseFiles(syncResults)

		await skillFixture.unRegisterEvents(skill2, {
			shouldUnregisterAll: true,
		})

		const eventContract = testUtil.assertsFileByNameInGeneratedFiles(
			contractFileName,
			syncResults.files
		)

		await this.Action('event', 'sync').execute({})

		assert.isFalse(diskUtil.doesFileExist(eventContract))

		const dirname = pathUtil.dirname(eventContract)
		assert.isFalse(diskUtil.doesDirExist(dirname))
	}

	private static async registerAndSyncEvents() {
		const { skill2, skillFixture, cli } =
			await this.seedDummySkillRegisterCurrentSkillAndInstallToOrg()

		const stamp = new Date().getTime()
		const eventName = `cleanup-event-test-${stamp}::${this.todaysVersion.constValue}`
		const filename = generateEventContractFileName({
			nameCamel: `cleanupEventTest${stamp}`,
			version: this.todaysVersion.constValue,
		})

		await skillFixture.registerEventContract(skill2, {
			eventSignatures: {
				[eventName]: {},
			},
		})

		const results = await this.Action('event', 'sync').execute({})

		return {
			skillFixture,
			syncResults: results,
			cli,
			skill2,
			contractFileName: filename,
		}
	}

	private static async assertCombinedContractContents(
		results: FeatureActionResponse
	) {
		const imported = await this.importCombinedContractsFile(results)

		assert.isTruthy(imported)
		assert.isArray(imported)

		assert.isTrue(imported.length >= EXPECTED_NUM_CONTRACTS_GENERATED)
	}

	private static async importCombinedContractsFile(
		results: FeatureActionResponse
	): Promise<EventContract[]> {
		const eventContractsFile = testUtil.assertsFileByNameInGeneratedFiles(
			'events.contract',
			results.files
		)

		const imported: EventContract[] = await this.Service(
			'import'
		).importDefault(eventContractsFile)

		return imported
	}

	private static async assertsContractsHaveValidPayloads(
		results: FeatureActionResponse
	) {
		const match = testUtil.assertsFileByNameInGeneratedFiles(
			`authenticate.${this.mercuryVersion.dirValue}.contract.ts`,
			results.files
		)

		const contract: EventContract = await this.Service('import').importDefault(
			match
		)

		assert.isTruthy(contract)

		validateEventContract(contract)

		const signature = eventContractUtil.getSignatureByName(
			contract,
			'authenticate'
		)

		assert.isTruthy(signature.emitPayloadSchema)
		validateSchema(signature.emitPayloadSchema)

		assert.isTruthy(signature.responsePayloadSchema)
		validateSchema(signature.responsePayloadSchema)
	}

	private static assertExpectedContractsAreCreated(
		results: FeatureActionResponse
	) {
		const filesToCheck = [
			{
				name: `whoami.${this.mercuryVersion.dirValue}.contract.ts`,
				path: `events${pathUtil.sep}${MERCURY_API_NAMESPACE}`,
			},
			{
				name: `getEventContracts.${this.mercuryVersion.dirValue}.contract.ts`,
				path: `events${pathUtil.sep}${MERCURY_API_NAMESPACE}`,
			},
		]

		this.assertFilesWereGenerated(filesToCheck, results)
	}

	private static assertExpectedPayloadSchemasAreCreated(
		results: FeatureActionResponse
	) {
		const filesToCheck = [
			{
				name: `unregisterListenersEmitTargetAndPayload.schema.ts`,
				path: `schemas${pathUtil.sep}${MERCURY_API_NAMESPACE}`,
			},
		]

		this.assertFilesWereGenerated(filesToCheck, results)
	}

	private static assertFilesWereGenerated(
		filesToCheck: { name: string; path: string }[],
		results: FeatureActionResponse
	) {
		for (const file of filesToCheck) {
			const match = testUtil.assertsFileByNameInGeneratedFiles(
				file.name,
				results.files
			)

			assert.doesInclude(match, file.path)
		}
	}

	private static assertCoreFilesSavedToDisk(results: FeatureActionResponse) {
		debugger
		const sigs = eventContractUtil.getNamedEventSignatures(coreContract)
		const files = results.files ?? []

		for (const sig of sigs) {
			debugger
			const name = `${sig.fullyQualifiedEventName}`
			const file = (files ?? []).find((f) => f.name.search(name) > -1)?.path

			assert.isFalsy(
				file,
				`Generated contract for ${sig.fullyQualifiedEventName} and it should not have because it's a core contract.`
			)
		}
	}
}
