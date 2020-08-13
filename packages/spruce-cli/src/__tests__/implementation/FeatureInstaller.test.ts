import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../AbstractCliTest'
import FeatureInstaller from '../../features/FeatureInstaller'

export default class FeatureInstallerTest extends AbstractCliTest {
	protected static installer: FeatureInstaller

	protected static async beforeEach() {
		this.installer = this.FeatureInstaller()
	}

	@test()
	protected static async canGetFeatureDependencies() {
		const dependencies = this.installer.getFeatureDependencies('schema')
		const match = dependencies.find((d) => d === 'skill')
		assert.isTruthy(match)
	}
}
