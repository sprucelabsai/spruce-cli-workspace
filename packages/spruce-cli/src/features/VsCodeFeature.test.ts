import { assert, test } from '@sprucelabs/test'
import fs from 'fs-extra'
import { Feature } from '#spruce/autoloaders/features'
import BaseCliTest from '../BaseCliTest'

export default class VsCodeFeatureTest extends BaseCliTest {
	@test('Properly detects when feature is not installed')
	protected static async notInstalled() {
		const isInstalled = await this.services.feature.isInstalled({
			features: [Feature.VsCode]
		})

		assert.isFalse(isInstalled)
	}

	@test('Can install the feature')
	protected static async installFeature() {
		await this.services.feature.install({
			features: [
				{
					feature: Feature.VsCode
				}
			]
		})

		const isInstalled = await this.services.feature.isInstalled({
			features: [Feature.VsCode]
		})

		// VSCode isn't installed in CI so we expect it to fail
		if (process.env.CI === 'true') {
			assert.isFalse(isInstalled)
		} else {
			assert.isTrue(isInstalled)
		}

		// double check exact file we'd expect
		assert.isTrue(
			fs.existsSync(this.resolvePath(this.cwd, '.vscode', 'settings.json'))
		)
	}
}
