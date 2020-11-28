import { test, assert } from '@sprucelabs/test'
import CliGlobalEmitter from '../../GlobalEmitter'
import AbstractCliTest from '../../test/AbstractCliTest'
import TestEmitter from '../../test/TestEmitter'

export default class StartingOnboardingTest extends AbstractCliTest {
	@test()
	protected static async hasCreateAction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('onboard').Action('onboard').execute)
	}

	@test()
	protected static async addsCommandListeners() {
		const testEmitter = TestEmitter.TestEmitter()
		CliGlobalEmitter.setInstance(testEmitter)

		await this.Cli()

		assert.isTrue(testEmitter.hasListeners('feature.will-execute'))
		// assert.isTrue(testEmitter.hasListeners('feature.did-execute'))
	}
}
