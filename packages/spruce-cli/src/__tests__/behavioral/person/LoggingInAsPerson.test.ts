import { test, assert } from '@sprucelabs/test'
import { DEMO_PHONE } from '../../../fixtures/PersonFixture'
import AbstractCliTest from '../../../tests/AbstractCliTest'

export default class LoggingInAsPersonTest extends AbstractCliTest {
	@test()
	protected static async hasSyncErrorAction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('person').Action('login').execute)
	}

	@test()
	protected static async asksForPinWithoutBeingInstalled() {
		const cli = await this.FeatureFixture().installCachedFeatures('skills')

		void cli.getFeature('person').Action('login').execute({
			phone: DEMO_PHONE,
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
			phone: DEMO_PHONE,
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
		const cli = await this.FeatureFixture().installCachedFeatures('skills')

		const promise = cli.getFeature('person').Action('login').execute({
			phone: DEMO_PHONE,
		})

		await this.waitForInput()
		await this.ui.sendInput(DEMO_PHONE.substr(-4))

		const results = await promise

		assert.isFalsy(results.errors)

		const person = this.Service('auth').getLoggedInPerson()

		assert.isTruthy(person)
		assert.isString(person.id)
		assert.isString(person.token)
		assert.isTrue(person.isLoggedIn)
	}
}
