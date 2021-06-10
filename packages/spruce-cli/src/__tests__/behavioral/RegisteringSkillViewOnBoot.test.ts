import { test, assert } from '@sprucelabs/test'
import AbstractSkillTest from '../../tests/AbstractSkillTest'

class RegisteringSkillViewOnBoot {}

export default class RegisteringSkillViewOnBootTest extends AbstractSkillTest {
	@test()
	protected static async canCreateRegisteringSkillViewOnBoot() {
		const registeringSkillViewOnBoot = new RegisteringSkillViewOnBoot()
		assert.isTruthy(registeringSkillViewOnBoot)
	}

	@test()
	protected static async yourNextTest() {
		assert.isTrue(false)
	}
}
