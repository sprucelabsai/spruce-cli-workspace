import pathUtil from 'path'
import chokidar from 'chokidar'
import { GeneratedFile, GeneratedFileOrDir } from '../../types/cli.types'
import AbstractFeature from '../AbstractFeature'
import { FeatureCode } from '../features.types'

type ChokidarAction = 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir'

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

		console.log('Chokidar watch - ', this.cwd + '/**/*')
		this.watcher = chokidar.watch(this.cwd + '/**/*', {
			ignoreInitial: true,
		})

		this.watcher.on('all', async (action, path) => {
			this.changesSinceLastChange.push({
				schemaId: this.mapChokidarActionToSchemaId(action),
				version: 'v2020_07_22',
				values: {
					action: this.mapChokidarActionToGeneratedAction(action),
					path,
					name: pathUtil.basename(path),
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

	private mapChokidarActionToSchemaId(
		chokidar: ChokidarAction
	): GeneratedFileOrDir['schemaId'] {
		return chokidar.search(/dir/gi) > -1 ? 'generatedDir' : 'generatedFile'
	}

	private mapChokidarActionToGeneratedAction(chokidar: ChokidarAction) {
		const map = {
			add: 'generated',
			addDir: 'generated',
			change: 'updated',
			unlink: 'deleted',
			unlinkDir: 'deleted',
		}

		return map[chokidar] as GeneratedFile['action']
	}

	private async fireChange() {
		const changes = this.changesSinceLastChange
		this.changesSinceLastChange = []
		await this.emitter.emit('watcher.did-detect-change', { changes })
	}

	public async stopWatching() {
		this._isWatching = false
		await this.watcher?.close()
	}
}
