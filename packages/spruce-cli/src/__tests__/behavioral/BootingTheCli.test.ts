import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../AbstractCliTest'

export default class BootTest extends AbstractCliTest {
	@test('can boot cli')
	protected static async testBooting() {
		const cli = await this.Cli()
		assert.isOk(cli)
	}
}
