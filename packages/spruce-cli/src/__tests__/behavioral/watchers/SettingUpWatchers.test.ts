import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../../AbstractCliTest'

export default class SettingUpWatchersTest extends AbstractCliTest {
	@test()
	protected static async installsWatchers() {
		const fixture = this.FeatureFixture()

		const cli = await fixture.installFeatures([{ code: 'watch' }])

		const isInstalled = await cli.getFeature('watch').isInstalled()

		assert.isTrue(isInstalled)
	}
}
