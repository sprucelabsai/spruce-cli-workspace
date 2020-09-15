import AbstractFeature from '../AbstractFeature'
import { FeatureCode } from '../features.types'

export default class WatchFeature extends AbstractFeature {
	public description =
		'Watches for changes on the file system and emits app level events for other features to respond to.'
	public code: FeatureCode = 'watch'
	public nameReadable = 'Watch'

	public async isInstalled(): Promise<boolean> {
		return true
	}
}
