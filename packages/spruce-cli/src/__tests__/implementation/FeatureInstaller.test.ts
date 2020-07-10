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

	@test.skip()
	protected static async getCircularFeatureDependencies() {
		// const cli = await this.cli()
		// const dependencies = cli.services.feature.getFeatureDependencies({
		// 	feature: Feature.Skill
		// })
		// assert.isArray(dependencies)
		// // Verify order
		// assert.isEqual(dependencies?.[0].feature, Feature.Skill)
		// assert.isEqual(dependencies?.[1].feature, Feature.Schema)
		// assert.isEqual(dependencies?.[2].feature, Feature.Test)
	}
}
