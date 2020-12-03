import pathUtil from 'path'
import { EventContract } from '@sprucelabs/mercury-types'
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

	@test()
	protected static async generatesValidContractFile() {
		const fixture = this.FeatureFixture()
		const cli = await fixture.installFeatures(
			[
				{
					code: 'node',
					options: {
						name: 'event test skill',
						description: '',
					},
				},
				{
					code: 'event',
				},
			],
			'eventsInNodeModule'
		)

		const results = await cli.getFeature('event').Action('sync').execute({})

		assert.isFalsy(results.errors)

		await this.assertValidActionResponseFiles(results)

		this.assertExpectedFilesAreCreated(results)
		await this.assertCombinedContractContents(results)
		this.assertCombinedContractsHasEmitPayloads(results)
	}

	@test.only()
	protected static async canGetNumberOfEventsBackFromHealthCheck() {
		const fixture = this.FeatureFixture()
		const cli = await fixture.installFeatures(
			[
				{
					code: 'skill',
					options: {
						name: 'testing events',
						description: 'this too, is a great test!',
					},
				},
				{
					code: 'event',
				},
			],
			'events'
		)

		const results = await cli.getFeature('event').Action('sync').execute({})

		assert.isFalsy(results.errors)

		await this.Service('build').build()

		await this.openInVsCode()
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
			results.files ?? []
		)

		const imported: EventContract[] = await this.Service(
			'import'
		).importDefault(eventContractsFile)

		return imported
	}

	static assertCombinedContractsHasEmitPayloads(
		results: FeatureActionResponse
	) {
		throw new Error('Method not implemented.')
	}

	private static assertExpectedFilesAreCreated(results: FeatureActionResponse) {
		const filesToCheck = ['whoAmI.contract.ts', 'getEventContracts.contract.ts']

		for (const file of filesToCheck) {
			const match = testUtil.assertsFileByNameInGeneratedFiles(
				file,
				results.files ?? []
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
