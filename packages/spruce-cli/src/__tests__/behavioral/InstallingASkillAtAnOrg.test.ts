import { mercuryErrorAssertUtil } from '@sprucelabs/mercury-types'
import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import AbstractCliTest from '../../tests/AbstractCliTest'

export default class InstallingASkillAtAnOrgTest extends AbstractCliTest {
	protected static async beforeEach() {
		await super.beforeEach()
		await this.OrganizationFixture().clearAllOrgs()
	}

	@test()
	protected static async hasInstallAction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('organization').Action('install').execute)
	}

	@test()
	protected static async cantInstallWithoutBeingLoggedIn() {
		const cli = await this.FeatureFixture().installCachedFeatures(
			'organizations'
		)

		const anonResults = await cli
			.getFeature('organization')
			.Action('install')
			.execute({})

		assert.isTruthy(anonResults.errors)
		mercuryErrorAssertUtil.assertError(
			anonResults.errors[0],
			'UNAUTHORIZED_ACCESS'
		)
	}

	@test()
	protected static async cantInstallWithoutAnyOrgs() {
		const cli = await this.FeatureFixture().installCachedFeatures(
			'organizations'
		)

		await this.PersonFixture().loginAsDummyPerson()

		const anonResults = await cli
			.getFeature('organization')
			.Action('install')
			.execute({})

		assert.isTruthy(anonResults.errors)
		errorAssertUtil.assertError(anonResults.errors[0], 'NO_ORGANIZATIONS_FOUND')
	}

	@test()
	protected static async cantInstallWithoutBeingRegistered() {
		const cli = await this.FeatureFixture().installCachedFeatures(
			'organizations'
		)

		await this.PersonFixture().loginAsDummyPerson()

		await this.OrganizationFixture().seedDummyOrg({
			name: 'My great org',
		})

		const anonResults = await cli
			.getFeature('organization')
			.Action('install')
			.execute({})

		assert.isTruthy(anonResults.errors)
		errorAssertUtil.assertError(anonResults.errors[0], 'SKILL_NOT_REGISTERED')
	}

	@test()
	protected static async canInstallSkillAtOrg() {
		const cli = await this.FeatureFixture().installCachedFeatures(
			'organizations'
		)

		const org = await this.OrganizationFixture().seedDummyOrg({
			name: 'My great org',
		})

		const skill = await this.SkillFixture().registerCurrentSkill({
			name: 'my amazing skill',
		})

		const promise = cli.getFeature('organization').Action('install').execute({})

		await this.waitForInput()

		assert.doesInclude(this.ui.lastInvocation().command, 'confirm')

		await this.ui.sendInput('')

		const results = await promise

		assert.isFalsy(results.errors)

		const isInstalled = await this.Store('organization').isSkillInstalledAtOrg(
			skill.id,
			org.id
		)

		assert.isTruthy(isInstalled)
	}

	@test()
	protected static async asksYouToSelectOrgWithMoreThanOne() {
		const cli = await this.FeatureFixture().installCachedFeatures(
			'organizations'
		)

		await this.OrganizationFixture().seedDummyOrg({
			name: 'My great org',
		})

		const org2 = await this.OrganizationFixture().seedDummyOrg({
			name: 'My great org',
		})

		const skill = await this.SkillFixture().registerCurrentSkill({
			name: 'my amazing skill',
		})

		const promise = cli.getFeature('organization').Action('install').execute({})

		await this.waitForInput()

		assert.doesInclude(this.ui.lastInvocation().options, {
			type: 'select',
		})

		await this.ui.sendInput(org2.id)

		const results = await promise

		assert.isFalsy(results.errors)

		const isInstalled = await this.Store('organization').isSkillInstalledAtOrg(
			skill.id,
			org2.id
		)

		assert.isTruthy(isInstalled)
	}
}
