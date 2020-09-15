import AbstractFeature from '../AbstractFeature'
import { FeatureCode } from '../features.types'

export default class WatchFeature extends AbstractFeature {
	public description =
		'Watches for changes on the file system and emits app level events for other features to respond to.'
	public code: FeatureCode = 'watch'
	public nameReadable = 'Watch'

	protected _isWatching = false

	public async isInstalled(): Promise<boolean> {
		return true
	}

	public async isWatching() {
		return this._isWatching
	}

	public async startWatching() {
		this._isWatching = true
	}

	public async stopWatching() {
		this._isWatching = false
	}
}
