import { test, assert } from '@sprucelabs/test'
import ScriptLoader from '../../features/onboard/ScriptLoader'
import ScriptPlayer from '../../features/onboard/ScriptPlayer'
import AbstractCliTest from '../../test/AbstractCliTest'

export default class OnboardingScriptLoaderTest extends AbstractCliTest {
	@test()
	protected static scripLoaderLoadScriptsFunction() {
		assert.isFunction(ScriptLoader.LoadScripts)
	}

	@test()
	protected static async loadingScriptsReturnsPlayer() {
		const player = await this.Player()
		assert.isTrue(player instanceof ScriptPlayer)
	}

	private static async Player() {
		return await ScriptLoader.LoadScripts({
			ui: this.ui,
			dir: this.resolveTestPath('../support/scripts'),
			onboardingStore: this.Store('onboarding'),
		})
	}

	@test()
	protected static async playsLoadedScripts() {
		const player = await this.Player()

		await player.playScriptWithKey('first')

		assert.doesInclude(this.ui.invocations, {
			command: 'renderLine',
			options: { message: 'hello world' },
		})

		assert.doesInclude(this.ui.invocations, {
			command: 'renderLine',
			options: { message: 'second script' },
		})

		assert.doesInclude(this.ui.invocations, {
			command: 'renderLine',
			options: { message: 'the last script' },
		})
	}
}
