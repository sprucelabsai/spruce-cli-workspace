import pathUtil from 'path'
import {
	EventContract,
	eventContractUtil,
	validateEventContract,
} from '@sprucelabs/mercury-types'
import { validateSchema } from '@sprucelabs/schema'
import { CORE_NAMESPACE, namesUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import { FeatureActionResponse } from '../../../features/features.types'
import AbstractEventTest from '../../../test/AbstractEventTest'
import testUtil from '../../../utilities/test.utility'

export default class KeepingEventsInSyncTest extends AbstractEventTest {
	@test()
	protected static async hasSyncEventsAction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('event').Action('sync').execute)
	}

	@test.only()
	protected static async generatesValidContractFile() {
		const fixture = this.FeatureFixture()
		const cli = await fixture.installCachedFeatures('eventsInNodeModule')

		const results = await cli.getFeature('event').Action('sync').execute({})

		assert.isFalsy(results.errors)

		await this.openInVsCode()

		await this.assertsContractsHaveValidEmitPayload(results)
		await this.assertValidActionResponseFiles(results)

		this.assertExpectedFilesAreCreated(results)
		await this.assertCombinedContractContents(results)
	}

	@test()
	protected static async canGetNumberOfEventsBackFromHealthCheck() {
		const fixture = this.FeatureFixture()
		const cli = await fixture.installCachedFeatures('events')

		const results = await cli.getFeature('event').Action('sync').execute({})

		assert.isFalsy(results.errors)

		await this.Service('build').build()

		const health = await cli.checkHealth({ isRunningLocally: false })

		assert.isTruthy(health.event)
		assert.isEqual(health.event.status, 'passed')
		assert.isTruthy(health.event.contracts)

		const imported = await this.importCombinedContractsFile(results)

		assert.isLength(health.event.contracts, imported.length)
	}

	private static async assertCombinedContractContents(
		results: FeatureActionResponse
	) {
		const imported = await this.importCombinedContractsFile(results)

		assert.isTruthy(imported)
		assert.isArray(imported)
		assert.isLength(imported, (results.files?.length ?? 0) - 1)
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

	private static async assertsContractsHaveValidEmitPayload(
		results: FeatureActionResponse
	) {
		const match = testUtil.assertsFileByNameInGeneratedFiles(
			'authenticate.contract.ts',
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
	}

	private static assertExpectedFilesAreCreated(results: FeatureActionResponse) {
		const filesToCheck = ['whoAmI.contract.ts', 'getEventContracts.contract.ts']

		for (const file of filesToCheck) {
			const match = testUtil.assertsFileByNameInGeneratedFiles(
				file,
				results.files
			)

			assert.doesInclude(
				match,
				`events${pathUtil.sep}${namesUtil.toCamel(CORE_NAMESPACE)}${
					pathUtil.sep
				}`
			)
		}
	}
}
