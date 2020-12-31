import pathUtil from 'path'
import { EventContract, validateEventContract } from '@sprucelabs/mercury-types'
import { validateSchema } from '@sprucelabs/schema'
import { eventContractUtil } from '@sprucelabs/spruce-event-utils'
import {
	MERCURY_API_NAMESPACE,
	namesUtil,
	versionUtil,
} from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import { FeatureActionResponse } from '../../../features/features.types'
import AbstractEventTest from '../../../tests/AbstractEventTest'
import testUtil from '../../../tests/utilities/test.utility'

const EXPECTED_NUM_CONTRACTS_GENERATED = 33

export default class KeepingEventsInSyncTest extends AbstractEventTest {
	private static get mercuryVersion() {
		return versionUtil.generateVersion('2020-12-25')
	}

	private static get todaysVersion() {
		return versionUtil.generateVersion()
	}

	@test()
	protected static async hasSyncEventsAction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('event').Action('sync').execute)
	}

	@test.only()
	protected static async generatesValidContractFile() {
		const cli = await this.FeatureFixture().installCachedFeatures(
			'eventsInNodeModule'
		)

		const results = await cli.getFeature('event').Action('sync').execute({})

		await this.assertValidEventResults(results)
	}

	@test()
	protected static async syncingSchemasRetainsEventPayloadSchemas() {
		const cli = await this.FeatureFixture().installCachedFeatures('events')
		const results = await cli.getFeature('schema').Action('sync').execute({})

		this.assertExpectedPayloadSchemasAreCreated(results)
	}

	@test()
	protected static async syncingSchemasDoesNotSyncEventSchemasIfEventsNotInstalled() {
		const cli = await this.FeatureFixture().installCachedFeatures('schemas')
		const results = await cli.getFeature('schema').Action('sync').execute({})

		assert.doesThrow(() => this.assertExpectedPayloadSchemasAreCreated(results))
	}

	@test()
	protected static async canGetNumberOfEventsBackFromHealthCheck() {
		const cli = await this.FeatureFixture().installCachedFeatures('events')

		const results = await cli.getFeature('event').Action('sync').execute({})

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
		const {
			skillFixture,
			skill2,
			cli,
		} = await this.seedDummySkillRegisterCurrentSkillAndInstallToOrg()

		await skillFixture.registerEventContract(skill2, {
			eventSignatures: {
				[`my-new-event::${this.todaysVersion.constValue}`]: {},
			},
		})

		const results = await cli.getFeature('event').Action('sync').execute({})

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
	}

	private static async assertValidEventResults(results: FeatureActionResponse) {
		assert.isFalsy(results.errors)

		await this.assertsContractsHaveValidPayloads(results)

		this.assertExpectedContractsAreCreated(results)

		this.assertExpectedPayloadSchemasAreCreated(results)

		await this.assertCombinedContractContents(results)
		await this.assertValidActionResponseFiles(results)
	}

	private static async assertCombinedContractContents(
		results: FeatureActionResponse
	) {
		const imported = await this.importCombinedContractsFile(results)

		assert.isTruthy(imported)
		assert.isArray(imported)

		assert.isLength(imported, EXPECTED_NUM_CONTRACTS_GENERATED)
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
				name: `unRegisterListenersTargetAndPayload.schema.ts`,
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
}
