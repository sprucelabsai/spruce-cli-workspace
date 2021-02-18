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
	protected static async hasCreateAction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('onboard').Action('onboard').execute)
	}

	@test()
	protected static async addsCommandListeners() {
		const testEmitter = TheTestEmitter.TestEmitter()

		await this.Cli({ emitter: testEmitter })

		assert.isTrue(testEmitter.hasListeners('feature.will-execute'))
	}
}
