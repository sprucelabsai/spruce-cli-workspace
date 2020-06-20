import { test } from '@sprucelabs/test'
import BaseCliTest from './BaseCliTest'

export default class FeatureServiceTest extends BaseCliTest {
	@test('Can get feature dependencies')
	protected static async getFeatureDependencies() {
		// const cli = await this.cli()
		// const dependencies = cli.services.feature.getFeatureDependencies({
		// 	feature: Feature.Test
		// })
		// assert.isArray(dependencies)
		// // Verify order
		// assert.equal(dependencies?.[0].feature, Feature.Skill)
		// assert.equal(dependencies?.[1].feature, Feature.Schema)
		// assert.equal(dependencies?.[2].feature, Feature.Test)
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
