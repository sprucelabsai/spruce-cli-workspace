import { test, assert } from '@sprucelabs/test'
import AbstractSkillTest from '../../tests/AbstractSkillTest'

export default class SettingUpASkillForTestingTest extends AbstractSkillTest {
	protected static skillCacheKey = 'tests'
	protected static skillSlug = `test-skill-${new Date().getTime()}`

	@test()
	protected static async hasSetupAction() {
		assert.isFunction(this.Executer('test', 'setup').execute)
	}

	@test()
	protected static async logsInAsDemoPerson() {
		const results = await this.Executer('test', 'setup').execute({
			demoNumber: process.env.DEMO_NUMBER,
			skillSlug: this.skillSlug,
		})

		assert.isFalsy(results.errors)

		const auth = this.Service('auth')
		const person = auth.getLoggedInPerson()

		assert.isTruthy(person)
	}

	@test()
	protected static async registersCurrentSkill() {
		const auth = this.Service('auth')
		const skill = auth.getCurrentSkill()

		assert.isTruthy(skill)
	}

	@test()
	protected static async canRunAgainWithoutError() {
		const results = await this.Executer('test', 'setup').execute({
			demoNumber: process.env.DEMO_NUMBER,
			skillSlug: this.skillSlug,
		})

		assert.isFalsy(results.errors)

		const auth = this.Service('auth')
		const skill = auth.getCurrentSkill()

		assert.isEqual(skill?.slug, this.skillSlug)
	}

	@test()
	protected static async canCorrectInvalidAuth() {
		const auth = this.Service('auth')
		//@ts-ignore
		auth.updateCurrentSkill({ fail: true })

		const results = await this.Executer('test', 'setup').execute({
			demoNumber: process.env.DEMO_NUMBER,
			skillSlug: this.skillSlug,
		})

		assert.isFalsy(results.errors)

		const skill = auth.getCurrentSkill()

		assert.isEqual(skill?.slug, this.skillSlug)
	}
}
