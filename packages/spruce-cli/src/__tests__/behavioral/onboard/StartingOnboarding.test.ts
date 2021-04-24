import { test, assert } from '@sprucelabs/test'
import CliGlobalEmitter, { globalContract } from '../../../GlobalEmitter'
import AbstractCliTest from '../../../tests/AbstractCliTest'

class TheTestEmitter extends CliGlobalEmitter {
	public static TestEmitter() {
		return new TheTestEmitter(globalContract)
	}

	public hasListeners(eventName: string) {
		return !!this.listenersByEvent[eventName]
	}
}

export default class StartingOnboardingTest extends AbstractCliTest {
	@test()
	protected static async hasOnboardAction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('onboard').Action('onboard').execute)
	}

	@test()
	protected static async addsCommandListeners() {
		const testEmitter = TheTestEmitter.TestEmitter()

		await this.Cli({ emitter: testEmitter })

		assert.isTrue(testEmitter.hasListeners('feature.will-execute'))
	}

	@test()
	protected static async onboandingStaysOnAfterSkillInstall() {
		const onboardAction = this.Executer('onboard', 'onboard')
		const onboardPromise = onboardAction.execute()

		// get through first onboarding script and select short onboarding
		await this.waitForInput()
		await this.ui.sendInput('\n')
		await this.waitForInput()
		await this.ui.sendInput('short')
		await this.waitForInput()
		await this.ui.sendInput('\n')

		await onboardPromise

		const onboardingStore = this.Store('onboarding')
		assert.isEqual(onboardingStore.getMode(), 'short')

		const createSkillAction = this.Executer('skill', 'create')
		const createPromise = createSkillAction.execute()

		// skip warning about missing onboarding
		await this.waitForInput()
		await this.ui.sendInput('letMePass')
		await this.waitForInput()
		await this.ui.sendInput('\n')

		// install skill
		await this.waitForInput()
		await this.ui.sendInput('my new skill')
		await this.waitForInput()
		await this.ui.sendInput('a description')

		await createPromise

		assert.isEqual(onboardingStore.getMode(), 'short')
	}
}
