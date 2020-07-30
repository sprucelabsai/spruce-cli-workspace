import { test, assert } from '@sprucelabs/test'
import AbstractTestTest from '../../../AbstractTestTest'

export default class SettingUpTestsTest extends AbstractTestTest {
	@test()
	protected static async installsTests() {
		const cli = await this.installTests()

		const isInstalled = await cli.getFeature('test').isInstalled()

		assert.isTrue(isInstalled)
	}

	@test()
	protected static async canRunTestsButSaysAtLeastOneTestIsNeeded() {
		await this.installTests()
		const command = this.Service('command')
		await assert.doesThrowAsync(
			() => command.execute('yarn test'),
			/passWithNoTests/gis
		)
	}
}
