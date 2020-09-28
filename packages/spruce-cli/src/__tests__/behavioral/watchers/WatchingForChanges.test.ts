import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../../AbstractCliTest'

export default class WatchingForChangesTest extends AbstractCliTest {
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

	@test('fires once with one change', 1)
	@test('fires once with two changes', 2)
	@test('fires once with three changes', 3)
	protected static async watcherFiresEventWhenASrcFileChanges(
		changeCount: number,
		expectedChanges: any
	) {
		let fireCount = 0

		const cli = await this.installWatch()
		const feature = cli.getFeature('watch')

		cli.emitter.on('watcher.did-detect-change', (payload) => {
			fireCount++
			assert.isEqualDeep(payload.changes, expectedChanges)
		})

		void feature.startWatching()

		for (let idx = 0; idx < changeCount; idx++) {
			diskUtil.writeFile(
				this.resolvePath(`index-${idx}.js`),
				'console.log("hello world")'
			)
		}

		await this.wait(1000)
		await feature.stopWatching()

		assert.isEqual(fireCount, 1)
	}

	private static async installWatch() {
		const fixture = this.FeatureFixture()
		const cli = await fixture.installFeatures([{ code: 'watch' }])
		return cli
	}
}
