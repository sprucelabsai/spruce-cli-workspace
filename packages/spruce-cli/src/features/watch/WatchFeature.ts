import pathUtil from 'path'
import { SchemaRegistry } from '@sprucelabs/schema'
import chokidar from 'chokidar'
import { GeneratedFile, GeneratedFileOrDir } from '../../types/cli.types'
import AbstractFeature from '../AbstractFeature'
import { FeatureCode } from '../features.types'

export default class WatchFeature extends AbstractFeature {
	public description =
		'Watches for changes on the file system and emits app level events for other features to respond to.'
	public code: FeatureCode = 'watch'
	public nameReadable = 'Watch'

	private _isWatching = false
	private watcher?: chokidar.FSWatcher
	// eslint-disable-next-line no-undef
	private timeoutId?: NodeJS.Timeout
	private changesSinceLastChange: GeneratedFileOrDir[] = []

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
				schemaId: 'generatedFile',
				version: 'v2020_07_22',
				values: {
					action: this.mapChokidarActionToGeneratedAction(action),
					path: stats,
					name: pathUtil.basename(stats),
				},
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
		const changes = this.changesSinceLastChange
		this.changesSinceLastChange = []
		const registry = SchemaRegistry.getInstance()
		console.log(registry)
		debugger
		await this.emitter.emit('watcher.did-detect-change', { changes })
	}

	public async stopWatching() {
		this._isWatching = false
		await this.watcher?.close()
	}
}
