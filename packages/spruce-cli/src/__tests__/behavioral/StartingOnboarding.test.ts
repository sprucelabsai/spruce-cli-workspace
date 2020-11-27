import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../test/AbstractCliTest'

export default class StartingOnboardingTest extends AbstractCliTest {
	@test()
	protected static async hasCreateAction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('onboard').Action('onboard').execute)
	}
}
