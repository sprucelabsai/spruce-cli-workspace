import { assert, test } from '@sprucelabs/test'
import fs from 'fs-extra'
import uuid from 'uuid'
import BaseTest from '../BaseTest'
import { Feature } from '#spruce/autoloaders/features'

export default class FeatureServiceTest extends BaseTest {
	@test('Can get feature dependencies')
	protected static async getFeatureDependencies() {
		const dependencies = this.services.feature.getFeatureDependencies({
			feature: Feature.Test
		})
		assert.isArray(dependencies)
		// Verify order
		assert.equal(dependencies?.[0].feature, Feature.Skill)
		assert.equal(dependencies?.[1].feature, Feature.Schema)
		assert.equal(dependencies?.[2].feature, Feature.Test)
	}

	@test('Can get circular feature dependencies')
	protected static async getCircularFeatureDependencies() {
		const dependencies = this.services.feature.getFeatureDependencies({
			feature: Feature.Skill
		})
		assert.isArray(dependencies)
		// Verify order
		assert.equal(dependencies?.[0].feature, Feature.Skill)
		assert.equal(dependencies?.[1].feature, Feature.Schema)
		assert.equal(dependencies?.[2].feature, Feature.Test)
	}

	@test('Can install a feature')
	protected static async installFeature() {
		await this.services.feature.install({
			features: [
				{
					feature: Feature.Skill,
					options: {
						name: uuid.v4(),
						description: uuid.v4()
					}
				}
			]
		})

		assert.isTrue(fs.existsSync(this.services.feature.cwd as string))
	}
}
