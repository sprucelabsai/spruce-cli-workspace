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

	protected static async seedDummySkillRegisterCurrentSkillAndInstallToOrg() {
		const cliPromise = this.installEventFeature('events')

		const skillFixture = this.SkillFixture()

		const skill2 = await skillFixture.seedDemoSkill({
			name: 'my second skill',
		})

		const orgFixture = this.OrganizationFixture()
		const org = await orgFixture.seedDemoOrg({ name: 'my org' })

		await orgFixture.installSkillAtOrganization(skill2.id, org.id)

		const cli = await cliPromise

		const skill = await skillFixture.registerCurrentSkill({
			name: 'my first skill',
		})

		await orgFixture.installSkillAtOrganization(skill.id, org.id)

		return { skillFixture, currentSkill: skill, skill2, cli, org }
	}
}
