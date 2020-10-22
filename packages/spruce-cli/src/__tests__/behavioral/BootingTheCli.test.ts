import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../test/AbstractCliTest'

export default class BootTest extends AbstractCliTest {
	@test()
	protected static async canBootTheCli() {
		const cli = await this.Cli()
		assert.isTruthy(cli)
	}
}
