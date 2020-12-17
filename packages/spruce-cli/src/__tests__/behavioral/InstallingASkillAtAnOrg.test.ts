import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import AbstractCliTest from '../../tests/AbstractCliTest'

export default class InstallingASkillAtAnOrgTest extends AbstractCliTest {
	@test()
	protected static async hasInstallAction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('organization').Action('install').execute)
	}

	@test()
	protected static async cantInstallWithoutBengiLoggedInNorWithoutAnAnOrg() {
		const cli = await this.FeatureFixture().installCachedFeatures(
			'organizations'
		)

		const anonResults = await cli
			.getFeature('organization')
			.Action('install')
			.execute({})

		assert.isTruthy(anonResults.errors)
		errorAssertUtil.assertError(anonResults.errors[0], 'MERCURY_RESPONSE_ERROR')
		errorAssertUtil.assertError(anonResults.errors[0], 'MERCURY_RESPONSE_ERROR')

		await this.PersonFixture().loginAsDummyPerson()
	}

	@test()
	protected static async canInstallSkillAtOnlyOrgJustByConfirming() {
		const cli = await this.FeatureFixture().installCachedFeatures(
			'organizations'
		)

		const org = await this.OrganizationFixture().seedDummyOrg({
			name: 'My great org',
		})

		const promise = cli.getFeature('organization').Action('install').execute({})

		assert.doesInclude(this.ui.lastInvocation().command, 'confirm')

		await this.ui.sendInput('')

		const results = await promise

		assert.isFalsy(results)

		const isInstalled = await this.Store('organization').isSkillInstalledAtOrg(
			org.id
		)

		assert.isTruthy(isInstalled)
	}
}
