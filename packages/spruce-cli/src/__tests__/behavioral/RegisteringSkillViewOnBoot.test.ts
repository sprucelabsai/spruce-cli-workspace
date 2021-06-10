import { test, assert } from '@sprucelabs/test'
import AbstractSkillTest from '../../tests/AbstractSkillTest'

export default class RegisteringSkillViewOnBootTest extends AbstractSkillTest {
	protected static skillCacheKey = 'views'

	@test()
	protected static async noEventsToStart() {
		await this.registerAndBootSkill()

		const skillViews = await this.Store('view').fetchSkillViews()

		assert.isFalsy(skillViews)
	}

	@test()
	protected static async syncsViewsOnBoot() {
		await this.Action('view', 'create').execute({
			viewType: 'skillView',
			isRoot: true,
		})

		await this.buildSkill()
		await this.bootSkill()

		const skillViews = await this.Store('view').fetchSkillViews()

		assert.isTruthy(skillViews)
	}

	protected static async registerAndBootSkill() {
		await this.registerCurrentSkillAndInstallToOrg()
		await this.bootSkill()
	}

	private static async bootSkill() {
		const boot = await this.Action('skill', 'boot').execute({})
		boot.meta?.kill()
	}

	private static async buildSkill() {
		await this.Service('build').build()
	}

	protected static async registerCurrentSkillAndInstallToOrg() {
		const skillFixture = this.SkillFixture()
		const orgFixture = this.OrganizationFixture()

		const org = await orgFixture.seedDemoOrg({ name: 'my org' })

		const skill = await skillFixture.registerCurrentSkill({
			name: 'current skill',
		})

		await orgFixture.installSkillAtOrganization(skill.id, org.id)

		return { skillFixture, currentSkill: skill, org, orgFixture }
	}
}
