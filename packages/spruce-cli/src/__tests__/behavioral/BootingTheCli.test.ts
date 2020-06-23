import { test, assert } from '@sprucelabs/test'
import BaseCliTest from '../../BaseCliTest'

export default class BootTest extends BaseCliTest {
	@test('can boot cli')
	protected static async testBooting() {
		const cli = await this.Cli()
		assert.isOk(cli)
	}
}
