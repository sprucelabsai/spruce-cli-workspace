import chokidar from 'chokidar'
import AbstractFeature from '../AbstractFeature'
import { FeatureCode } from '../features.types'

export default class WatchFeature extends AbstractFeature {
	public description =
		'Watches for changes on the file system and emits app level events for other features to respond to.'
	public code: FeatureCode = 'watch'
	public nameReadable = 'Watch'

	private _isWatching = false
	private watcher?: chokidar.FSWatcher

	public async isInstalled(): Promise<boolean> {
		return true
	}

	public async isWatching() {
		return this._isWatching
	}

	public async startWatching() {
		this._isWatching = true

		this.watcher = chokidar.watch(this.cwd + '/**/*')

		this.watcher.on('all', async () => {
			await this.emitter.emit('watcher.did-detect-change')
		})
	}

	public async stopWatching() {
		this._isWatching = false
		await this.watcher?.close()
	}
}
