import { test, assert } from '@sprucelabs/test'
import AbstractSkillTest from '../../tests/AbstractSkillTest'

class PkgService {}

export default class PkgServiceTest extends AbstractSkillTest {
	@test()
	protected static async canCreatePkgService() {
		const pkgService = new PkgService()
		assert.isTruthy(pkgService)
	}

	@test()
	protected static async yourNextTest() {
		assert.isTrue(false)
	}
}
