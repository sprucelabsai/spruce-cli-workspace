import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../AbstractCliTest'
import FeatureInstaller from '../../features/FeatureInstaller'

export default class FeatureManagerTest extends AbstractCliTest {
	protected static installer: FeatureInstaller

	protected static async beforeEach() {
		this.installer = this.FeatureInstaller()
	}

	@test()
	protected static async canGetFeatureDependencies() {
		const dependencies = this.installer.getFeatureDependencies('test')
		const match = dependencies.find((d) => d === 'skill')
		assert.isOk(match)
	}
}
