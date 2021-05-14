import { errorAssertUtil } from '@sprucelabs/test-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractTestTest from '../../../tests/AbstractTestTest'

export default class RunningTestsTest extends AbstractTestTest {
	@test()
	protected static async hasTestAction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('test').Action('test').execute)
	}

	@test()
	protected static async runningTestsActuallyRunsTests() {
		const cli = await this.installTests()
		const creationPromise = cli.getFeature('test').Action('create').execute({
			type: 'behavioral',
			nameReadable: 'Can book appointment',
			nameCamel: 'canBookAppointment',
			namePascal: 'CanBookAppointment',
		})

		await this.waitForInput()
		await this.ui.sendInput('')

		const creationResults = await creationPromise

		const file = creationResults.files?.[0]
		assert.isTruthy(file)

		this.fixBadTest(file.path)

		const promise = cli.getFeature('test').Action('create').execute({
			type: 'behavioral',
			nameReadable: 'Can cancel appointment',
			nameCamel: 'canCancelAppointment',
			namePascal: 'CanCancelAppointment',
		})

		await this.waitForInput()
		await this.ui.sendInput('')

		await promise

		await this.Service('build').build()

		const results = await cli.getFeature('test').Action('test').execute({
			shouldReportWhileRunning: false,
		})

		assert.isTruthy(results.errors)
		assert.isLength(results.errors, 1)

		errorAssertUtil.assertError(results.errors[0], 'TEST_FAILED')

		assert.isTruthy(results.meta)
		assert.isTruthy(results.meta?.testResults)

		assert.doesInclude(results.meta?.testResults, {
			wasKilled: false,
			totalTestFiles: 2,
			totalTestFilesComplete: 2,
			totalFailed: 1,
			totalPassed: 3,
			totalSkipped: 0,
			totalTests: 4,
			totalTodo: 0,
		})
	}
}
