import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../tests/AbstractCliTest'

export default class OrganizationStoreTest extends AbstractCliTest {
	@test()
	protected static async canCreateStore() {
		assert.isTruthy(this.Store('organization'))
	}

	@test()
	protected static async skillIsNotInstalledByDefault() {
		await this.FeatureFixture().installCachedFeatures('organizations')
		const org = await this.OrganizationFixture().seedDummyOrg({
			name: 'A cool org',
		})

		const skill = await this.SkillFixture().registerCurrentSkill({
			name: 'a new skill',
		})

		const isInstalled = await this.Store('organization').isSkillInstalledAtOrg(
			skill.id,
			org.id
		)

		assert.isFalse(isInstalled)
	}

	@test()
	protected static async installSkill() {
		await this.FeatureFixture().installCachedFeatures('organizations')

		const org = await this.OrganizationFixture().seedDummyOrg({
			name: 'A cool org',
		})

		const skill = await this.SkillFixture().registerCurrentSkill({
			name: 'a new skill',
		})

		await this.Store('organization').installSkillAtOrg(skill.id, org.id)

		const isInstalled = await this.Store('organization').isSkillInstalledAtOrg(
			skill.id,
			org.id
		)
		assert.isTrue(isInstalled)
	}

	@test()
	protected static async canGetMyOrgs() {
		await this.FeatureFixture().installCachedFeatures('organizations')
		const orgFixture = this.OrganizationFixture()
		const org1 = await orgFixture.seedDummyOrg({
			name: 'A cool org',
		})
		const org2 = await orgFixture.seedDummyOrg({
			name: 'A cool org',
		})

		const orgs = await this.Store('organization').getMyOrganizations()
		assert.isAbove(orgs.length, 2)
		assert.doesInclude(orgs, org1)
		assert.doesInclude(orgs, org2)
	}
}
