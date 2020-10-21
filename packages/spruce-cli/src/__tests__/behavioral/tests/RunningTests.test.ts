import { test, assert } from '@sprucelabs/test'
import AbstractTestTest from '../../../AbstractTestTest'

export default class RunningTestsTest extends AbstractTestTest {
	@test()
	protected static async hasTestAction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('test').Action('test').execute)
	}

	@test()
	protected static async runningTestsActuallyRunsTests() {
		const cli = await this.installTests('running-tests')
		await cli.getFeature('test').Action('create').execute({
			type: 'behavioral',
			nameReadable: 'Can book appointment',
			nameCamel: 'canBookAppointment',
			namePascal: 'CanBookAppointment',
		})

		await this.Service('build').build()

		const results = await cli.getFeature('test').Action('test').execute({})
		assert.isTruthy(results.errors)
	}
}
