import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../../tests/AbstractCliTest'

export default class RegisteringASkillTest extends AbstractCliTest {
	@test()
	protected static async hasRegisterAction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('skill').Action('register').execute)
	}
}
