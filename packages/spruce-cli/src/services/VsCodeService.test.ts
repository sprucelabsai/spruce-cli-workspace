import { assert, test } from '@sprucelabs/test'
import BaseCliTest from '../BaseCliTest'

export default class FeatureServiceTest extends BaseCliTest {
	@test('Can check if VSCode is installed')
	protected static async getFeatureDependencies() {
		const expectedIsInstalled = process.env.CI !== 'true'

		const isInstalled = await this.services.vsCode.isInstalled()
		assert.equal(isInstalled, expectedIsInstalled)
	}
}
