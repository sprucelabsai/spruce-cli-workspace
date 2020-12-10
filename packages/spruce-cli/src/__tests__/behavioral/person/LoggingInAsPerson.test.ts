import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../../test/AbstractCliTest'

const DUMMY_PHONE = '555-123-4567'
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
			phone: DUMMY_PHONE,
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
	protected static async badPinRendersWarningAndAsksForPinAgain() {
		const cli = await this.FeatureFixture().installCachedFeatures('skills')

		void cli.getFeature('person').Action('login').execute({
			phone: DUMMY_PHONE,
		})

		await this.waitForInput()

		await this.ui.sendInput('0000')

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

	@test.only()
	protected static async canLoginAsDummyPerson() {
		const cli = await this.FeatureFixture().installCachedFeatures('skills')

		const promise = cli.getFeature('person').Action('login').execute({
			phone: DUMMY_PHONE,
		})

		await this.waitForInput()

		await this.ui.sendInput('7777')

		const results = await promise

		assert.isFalsy(results.errors)

		const person = this.Store('person').getLoggedInPerson()

		assert.isTruthy(person)
		assert.isString(person.id)
		assert.isString(person.token)
		assert.isTrue(person.isLoggedIn)
	}
}
