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
		const cli = await this.installTests('tests')
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

		const results = await cli.getFeature('test').Action('test').execute({
			shouldReportWhileRunning: false,
		})

		assert.isFalsy(results.errors)
		assert.isTruthy(results.meta?.testResults)

		assert.isEqualDeep(results.meta, {
			testResults: {
				totalTestFiles: 2,
				testFiles: [
					{
						path: 'behavioral/CanCancelAppointment.test.ts',
						status: 'failed',
						tests: [
							{
								name: 'canCancelAppointment',
								status: 'failed',
								errorMessages: [
									results.meta?.testResults.testFiles[0].tests[0]
										.errorMessages[0],
								],
								duration:
									results.meta?.testResults.testFiles[0].tests[0].duration,
							},
						],
					},
					{
						path: 'behavioral/CanBookAppointment.test.ts',
						status: 'passed',
						tests: [
							{
								name: 'canBookAppointment',
								status: 'passed',
								errorMessages: [],
								duration:
									results.meta?.testResults.testFiles[1].tests[0].duration,
							},
						],
					},
				],
				totalTestFilesComplete: 2,
				totalFailed: 1,
				totalPassed: 1,
				totalTests: 2,
			},
		})
	}
}
