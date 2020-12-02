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
		testUtil.assertsFileByNameInGeneratedFiles(
			'events.contract.ts',
			results.files ?? []
		)

		await this.validateFiles(results)
	}

	private static async validateFiles(results: FeatureActionResponse) {
		const checker = this.Service('typeChecker')

		await Promise.all(
			(results.files ?? []).map((file) => checker.check(file.path))
		)
	}
}
