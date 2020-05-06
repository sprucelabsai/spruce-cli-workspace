import { assert, test } from '@sprucelabs/test'
import path from 'path'
import fs from 'fs-extra'
import BaseTest from '../BaseTest'
import { Feature } from '#spruce/autoloaders/features'

export default class VsCodeFeatureTest extends BaseTest {
	@test('Can install the skill feature')
	protected static async installFeature() {
		await this.services.feature.install({
			features: [
				{
					feature: Feature.VSCode
				}
			]
		})

		const isInstalled = await this.services.feature.isInstalled({
			features: [Feature.VSCode]
		})
		assert.isTrue(isInstalled)
		assert.isTrue(
			fs.existsSync(path.join(this.cwd, '.vscode', 'settings.json'))
		)
	}
}
