import { Mercury } from '@sprucelabs/mercury'
import { test, assert } from '@sprucelabs/test'
import BaseCliTest from '../../BaseCliTest'
import ServiceFactory from '../../factories/ServiceFactory'
import FeatureManager, { FeatureCode } from '../../FeatureManager'

export default class FeatureManagerTest extends BaseCliTest {
	protected static fm: FeatureManager

	public static FeatureManager() {
		const serviceFactory = new ServiceFactory(new Mercury())
		return FeatureManager.WithAllFeatures({
			cwd: this.cwd,
			serviceFactory
		})
	}

	protected static async beforeEach() {
		this.fm = this.FeatureManager()
	}

	@test()
	protected static async canGetFeatureDependencies() {
		const dependencies = this.fm.getFeatureDependencies(FeatureCode.Test)
		const match = dependencies.find(d => d === FeatureCode.Schema)
		assert.isOk(match)
	}

	@test.skip('Can get circular feature dependencies.')
	protected static async getCircularFeatureDependencies() {
		// const cli = await this.cli()
		// const dependencies = cli.services.feature.getFeatureDependencies({
		// 	feature: Feature.Skill
		// })
		// assert.isArray(dependencies)
		// // Verify order
		// assert.equal(dependencies?.[0].feature, Feature.Skill)
		// assert.equal(dependencies?.[1].feature, Feature.Schema)
		// assert.equal(dependencies?.[2].feature, Feature.Test)
	}
}
