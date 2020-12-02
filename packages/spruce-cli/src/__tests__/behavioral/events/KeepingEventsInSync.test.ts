import pathUtil from 'path'
import { CORE_NAMESPACE, namesUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
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

		// await this.Service('command').execute(`code ${this.cwd}`)
		// debugger

		await this.validateActionResponseFiles(results)
	}
}
