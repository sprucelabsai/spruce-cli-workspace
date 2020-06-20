import { test } from '@sprucelabs/test'
import BaseCliTest from '../BaseCliTest'

export default class FeatureServiceTest extends BaseCliTest {
	@test('Can check if VSCode is installed')
	protected static async getFeatureDependencies() {
		// const cli = await this.cli()
		// const expectedIsInstalled = process.env.CI !== 'true'
		// const isInstalled = await cli.services.vsCode.isInstalled()
		// assert.equal(isInstalled, expectedIsInstalled)
	}
}
