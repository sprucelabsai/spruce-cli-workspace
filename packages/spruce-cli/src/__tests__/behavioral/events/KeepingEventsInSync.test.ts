import pathUtil from 'path'
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
		await this.assertCombineContractContents(results)
	}

	private static async assertCombineContractContents(
		results: FeatureActionResponse
	) {
		const eventContractsFile = testUtil.assertsFileByNameInGeneratedFiles(
			'events.contract',
			results.files ?? []
		)

		const imported = await this.Service('import').importDefault(
			eventContractsFile
		)

		assert.isTruthy(imported)
		assert.isArray(imported)
		assert.isLength(imported, (results.files?.length ?? 0) - 1)
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
