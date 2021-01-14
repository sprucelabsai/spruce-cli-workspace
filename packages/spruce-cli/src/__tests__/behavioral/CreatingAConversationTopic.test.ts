import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../tests/AbstractCliTest'

export default class CreatingAConversationTopicTest extends AbstractCliTest {
	@test()
	protected static async hasCreateConversationAction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('conversation').Action('create').execute)
	}
}
