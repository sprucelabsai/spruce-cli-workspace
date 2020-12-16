import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../tests/AbstractCliTest'

export default class InstallingASkillAtAnOrgTest extends AbstractCliTest {
	@test()
	protected static async hasInstallAction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('organization').Action('install').execute)
	}

	@test()
	protected static async canInstallSkillAtOrg() {
		const cli = await this.FeatureFixture().installCachedFeatures(
			'organizations'
		)

		const org = await this.OrganizationFixture().seedDummyOrg({
			name: 'My great org',
		})

		console.log({ cli, org })
	}
}
