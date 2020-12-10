import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../tests/AbstractCliTest'
import TestEmitter from '../../tests/TestEmitter'

export default class StartingOnboardingTest extends AbstractCliTest {
	@test()
	protected static async hasCreateAction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('onboard').Action('onboard').execute)
	}

	@test()
	protected static async addsCommandListeners() {
		const testEmitter = TestEmitter.TestEmitter()

		await this.Cli({ emitter: testEmitter })

		assert.isTrue(testEmitter.hasListeners('feature.will-execute'))
	}
}
