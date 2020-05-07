import { assert, test } from '@sprucelabs/test'
import uuid from 'uuid'
import BaseTest from '../BaseTest'
import { Feature } from '#spruce/autoloaders/features'

export default class SkillFeatureTest extends BaseTest {
	@test('Properly detects when feature is not installed')
	protected static async notInstalled() {
		const isInstalled = await this.services.feature.isInstalled({
			features: [Feature.Skill]
		})

		assert.isFalse(isInstalled)
	}

	@test('Can install the feature')
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

		const isInstalled = await this.services.feature.isInstalled({
			features: [Feature.Skill]
		})
		assert.isTrue(isInstalled)
	}
}
