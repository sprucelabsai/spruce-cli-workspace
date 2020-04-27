import log from '../lib/log'
import AbstractFeature, { IFeaturePackage } from './AbstractFeature'

export default class SchemaFeature extends AbstractFeature {
	public packages: IFeaturePackage[] = [
		{
			name: '@sprucelabs/schema'
		}
	]

	public async install(options?: Record<string, any>) {
		log.debug('Install!', { options })
	}

	// TODO
	public async isInstalled() {
		return false
	}
}
