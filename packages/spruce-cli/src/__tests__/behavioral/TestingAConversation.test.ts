import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../tests/AbstractCliTest'

export default class TestingAConversationTest extends AbstractCliTest {
	@test()
	protected static async hasTestConvoFeature() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('conversation').Action('test').execute)
	}
}
