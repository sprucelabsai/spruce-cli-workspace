import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractTestTest from '../../../test/AbstractTestTest'

export default class RunningTestsTest extends AbstractTestTest {
	@test()
	protected static async hasTestAction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('test').Action('test').execute)
	}

	@test()
	protected static async runningTestsActuallyRunsTests() {
		const cli = await this.installTests('running-tests')
		const creationResults = await cli
			.getFeature('test')
			.Action('create')
			.execute({
				type: 'behavioral',
				nameReadable: 'Can book appointment',
				nameCamel: 'canBookAppointment',
				namePascal: 'CanBookAppointment',
			})

		const file = creationResults.files?.[0]
		assert.isTruthy(file)

		const contents = diskUtil.readFile(file.path)
		const passingContent = contents.replace(
			'assert.isTrue(false)',
			'assert.isTrue(true)'
		)

		diskUtil.writeFile(file.path, passingContent)

		await cli.getFeature('test').Action('create').execute({
			type: 'behavioral',
			nameReadable: 'Can cancel appointment',
			nameCamel: 'canCancelAppointment',
			namePascal: 'CanCancelAppointment',
		})

		await this.Service('build').build()

		const results = await cli.getFeature('test').Action('test').execute({})

		assert.isFalsy(results.errors)
		// assert.isEqualDeep(results.meta, {
		// 	testResults: [
		// 		{
		// 			testFile: 'behavioral/CanBookAppointment.test.ts',
		// 			status: 'passed',
		// 			tests: [
		// 				{
		// 					name: 'canBookAppointment',
		// 					status: 'passed',
		// 				},
		// 			],
		// 		},
		// 		{
		// 			testFile: 'behavioral/CanCancelAppointment.test.ts',
		// 			status: 'failed',
		// 			tests: [{ name: 'canCancelAppointment', status: 'failed' }],
		// 		},
		// 	],
		// })
	}
}
