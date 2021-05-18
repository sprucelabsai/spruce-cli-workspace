import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import { DEMO_NUMBER } from '../../../fixtures/PersonFixture'
import AbstractCliTest from '../../../tests/AbstractCliTest'

export default class LoggingInAsPersonTest extends AbstractCliTest {
	@test()
	protected static async hasLoginAction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('person').Action('login').execute)
	}

	@test()
	protected static async asksForPinWithoutBeingInstalled() {
		const cli = await this.FeatureFixture().installCachedFeatures('skills')

		void cli.getFeature('person').Action('login').execute({
			phone: DEMO_NUMBER,
		})

		await this.waitForInput()

		assert.doesInclude(this.ui.invocations, {
			command: 'prompt',
			options: {
				type: 'text',
			},
		})

		this.ui.reset()
	}

	@test.skip('enable when there are demo numbers that throw with bad pin')
	protected static async badPinRendersWarningAndAsksForPinAgain() {
		const cli = await this.FeatureFixture().installCachedFeatures('skills')

		void cli.getFeature('person').Action('login').execute({
			phone: DEMO_NUMBER,
		})

		await this.waitForInput()

		await this.ui.sendInput('0000')

		await this.waitForInput()

		assert.doesInclude(this.ui.invocations, {
			command: 'renderWarning',
		})

		await this.waitForInput()

		assert.doesInclude(this.ui.invocations, {
			command: 'prompt',
			options: {
				type: 'text',
			},
		})

		this.ui.reset()
	}

	@test()
	protected static async canLoginAsDemoPerson() {
		await this.loginAsDemoPerson()

		const person = this.Service('auth').getLoggedInPerson()

		assert.isTruthy(person)
		assert.isString(person.id)
		assert.isString(person.token)
		assert.isTrue(person.isLoggedIn)
	}

	@test()
	protected static async cantLogoutWithoutBeingLoggedIn() {
		const cli = await this.FeatureFixture().installCachedFeatures('skills')
		const results = await cli.getFeature('person').Action('logout').execute({})

		assert.isTruthy(results.errors)
		assert.isLength(results.errors, 1)

		errorAssertUtil.assertError(results.errors[0], 'NOT_LOGGED_IN')
	}

	@test()
	protected static async canLogOut() {
		const cli = await this.loginAsDemoPerson()

		const results = await cli.getFeature('person').Action('logout').execute({})

		assert.isFalsy(results.errors)

		const person = this.Service('auth').getLoggedInPerson()

		assert.isNull(person)
	}

	private static async loginAsDemoPerson() {
		const cli = await this.FeatureFixture().installCachedFeatures('skills')

		const promise = cli.getFeature('person').Action('login').execute({
			phone: DEMO_NUMBER,
		})

		await this.waitForInput()
		await this.ui.sendInput(DEMO_NUMBER.substr(-4))

		const results = await promise

		assert.isFalsy(results.errors)

		return cli
	}
}
