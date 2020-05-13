import { assert, test } from '@sprucelabs/test'
import fs from 'fs-extra'
import BaseTest from '../BaseCliTest'
import { Feature } from '#spruce/autoloaders/features'

export default class CircleCiFeatureTest extends BaseTest {
	@test('Properly detects when feature is not installed')
	protected static async notInstalled() {
		const isInstalled = await this.services.feature.isInstalled({
			features: [Feature.CircleCI]
		})

		assert.isFalse(isInstalled)
	}

	@test('Can install the feature')
	protected static async installFeature() {
		await this.services.feature.install({
			features: [
				{
					feature: Feature.CircleCI
				}
			]
		})

		const isInstalled = await this.services.feature.isInstalled({
			features: [Feature.CircleCI]
		})
		assert.isTrue(isInstalled)
		assert.isTrue(
			fs.existsSync(this.resolvePath(this.cwd, '.circleci', 'config.yml'))
		)
	}
}
