import { assert, test } from '@sprucelabs/test'
import fs from 'fs-extra'
import { Feature } from '#spruce/autoloaders/features'
import BaseCliTest from '../BaseCliTest'

export default class CircleCiFeatureTest extends BaseCliTest {
	@test('Properly detects when feature is not installed')
	protected static async notInstalled() {
		const isInstalled = await this.services.feature.isInstalled({
			features: [Feature.CircleCi]
		})

		assert.isFalse(isInstalled)
	}

	@test('Can install the feature')
	protected static async installFeature() {
		await this.services.feature.install({
			features: [
				{
					feature: Feature.CircleCi
				}
			]
		})

		const isInstalled = await this.services.feature.isInstalled({
			features: [Feature.CircleCi]
		})
		assert.isTrue(isInstalled)
		assert.isTrue(
			fs.existsSync(this.resolvePath(this.cwd, '.circleci', 'config.yml'))
		)
	}
}
