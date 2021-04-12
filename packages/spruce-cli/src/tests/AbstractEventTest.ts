import AbstractCliTest from './AbstractCliTest'

export default abstract class AbstractEventTest extends AbstractCliTest {
	protected static async installEventFeature(cacheKey?: string) {
		const fixture = this.FeatureFixture()
		const cli = await fixture.installFeatures(
			[
				{
					code: 'skill',
					options: {
						name: 'testing events',
						description: 'this too, is a great test!',
					},
				},
				{
					code: 'event',
				},
			],
			cacheKey
		)

		return cli
	}

	protected static async seedDummySkillRegisterCurrentSkillAndInstallToOrg(
		cacheKey = 'events'
	) {
		const results = await this.registerCurrentSkillAndInstallToOrg(cacheKey)

		const { skillFixture, orgFixture, org } = results

		const skill2 = await skillFixture.seedDemoSkill({
			name: 'my second skill',
		})

		await orgFixture.installSkillAtOrganization(skill2.id, org.id)

		return { ...results, skill2 }
	}

	protected static async registerCurrentSkillAndInstallToOrg(
		cacheKey = 'events'
	) {
		const cliPromise = this.installEventFeature(cacheKey)

		const skillFixture = this.SkillFixture()
		const orgFixture = this.OrganizationFixture()

		const org = await orgFixture.seedDemoOrg({ name: 'my org' })

		const cli = await cliPromise

		const skill = await skillFixture.registerCurrentSkill({
			name: 'my first skill',
		})

		await orgFixture.installSkillAtOrganization(skill.id, org.id)

		return { skillFixture, currentSkill: skill, cli, org, orgFixture }
	}
}
