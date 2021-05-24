import { test, assert } from '@sprucelabs/test'
import FeatureInstaller from '../../features/FeatureInstaller'
import AbstractCliTest from '../../tests/AbstractCliTest'

export default class FeatureInstallerTest extends AbstractCliTest {
	protected static installer: FeatureInstaller

	protected static async beforeEach() {
		await super.beforeEach()
		this.installer = this.FeatureInstaller()
	}

	@test()
	protected static async canGetFeatureDependencies() {
		const dependencies = this.installer.getFeatureDependencies('schema')
		assert.doesInclude(dependencies, { code: 'skill', isRequired: false })
		assert.doesInclude(dependencies, { code: 'node', isRequired: true })
	}

	@test()
	protected static async canGetFeatureDependenciesWithOptional() {
		const dependencies = this.installer.getFeatureDependencies('error')
		assert.doesInclude(dependencies, { code: 'skill', isRequired: false })
		assert.doesInclude(dependencies, { code: 'schema', isRequired: true })
		assert.doesInclude(dependencies, { code: 'node', isRequired: true })
	}

	@test()
	protected static async afterPackageInstallIsCalledOncePerFeature() {
		assert.isTrue(false)
	}
}
