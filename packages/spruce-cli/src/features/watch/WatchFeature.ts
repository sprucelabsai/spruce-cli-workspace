import pathUtil from 'path'
import chokidar from 'chokidar'
import { GeneratedFile } from '../../types/cli.types'
import AbstractFeature from '../AbstractFeature'
import { FeatureCode } from '../features.types'

export default class WatchFeature extends AbstractFeature {
	public description =
		'Watches for changes on the file system and emits app level events for other features to respond to.'
	public code: FeatureCode = 'watch'
	public nameReadable = 'Watch'

	private _isWatching = false
	private watcher?: chokidar.FSWatcher
	private timeoutId?: NodeJS.Timeout
	private changesSinceLastChange: GeneratedFile[] = []

	public async isInstalled(): Promise<boolean> {
		return true
	}

	public async isWatching() {
		return this._isWatching
	}

	public async startWatching() {
		this._isWatching = true

		this.watcher = chokidar.watch(this.cwd + '/**/*')

		this.watcher.on('all', async (action, stats) => {
			this.changesSinceLastChange.push({
				action: this.mapChokidarActionToGeneratedAction(action),
				path: stats,
				name: pathUtil.basename(stats),
			})

			if (this.timeoutId) {
				clearTimeout(this.timeoutId)
			}

			this.timeoutId = setTimeout(async () => {
				await this.fireChange()
			}, 500)
		})
	}

	private mapChokidarActionToGeneratedAction(
		chokidarAction: 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir'
	) {
		const map = {
			add: 'generated',
			addDir: 'generated',
			change: 'updated',
			unlink: 'deleted',
			unlinkDir: 'deleted',
		}

		return map[chokidarAction] as GeneratedFile['action']
	}

	private async fireChange() {
		await this.emitter.emit('watcher.did-detect-change')
	}

	public async stopWatching() {
		this._isWatching = false
		await this.watcher?.close()
	}
}
