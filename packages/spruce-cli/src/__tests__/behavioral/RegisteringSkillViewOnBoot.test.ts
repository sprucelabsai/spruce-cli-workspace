import { test, assert } from '@sprucelabs/test'
import AbstractSkillTest from '../../tests/AbstractSkillTest'

export default class RegisteringSkillViewOnBootTest extends AbstractSkillTest {
	@test()
	protected static async canCreateRegisteringSkillViewOnBoot() {
		assert.isTruthy(true)
	}
}
