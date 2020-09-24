import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../../AbstractCliTest'

export default class SettingUpWatchersTest extends AbstractCliTest {
	@test()
	protected static async installsWatchers() {
		const cli = await this.installWatch()
		const isInstalled = await cli.getFeature('watch').isInstalled()
		assert.isTrue(isInstalled)
	}

	@test()
	protected static async notWatchingAtTheStart() {
		const cli = await this.installWatch()
		const isWatching = await cli.getFeature('watch').isWatching()
		assert.isFalse(isWatching)
	}

	@test()
	protected static async canStartAndStopWatch() {
		const cli = await this.installWatch()
		const feature = cli.getFeature('watch')

		void feature.startWatching()

		let isWatching = await feature.isWatching()
		assert.isTrue(isWatching)

		await feature.stopWatching()

		isWatching = await feature.isWatching()
		assert.isFalse(isWatching)
	}

	@test()
	protected static async watcherFiresEventWhenASrcFileChanges() {
		const cli = await this.installWatch()
		const feature = cli.getFeature('watch')

		let fireCount = 0
		cli.on('watcher.did-detect-change', () => {
			fireCount++
		})

		void feature.startWatching()

		diskUtil.writeFile(
			this.resolvePath('src', 'index.ts'),
			'console.log("hello world")'
		)

		await feature.stopWatching()

		assert.isEqual(fireCount, 1)
	}

	private static async installWatch() {
		const fixture = this.FeatureFixture()
		const cli = await fixture.installFeatures([{ code: 'watch' }], 'watcher')
		return cli
	}
}
