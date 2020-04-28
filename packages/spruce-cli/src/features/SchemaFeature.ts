import log from '../lib/log'
import AbstractFeature, { IFeaturePackage } from './AbstractFeature'
import { Feature } from '#spruce/autoloaders/features'

export default class SchemaFeature extends AbstractFeature {
	public featureDependencies = [Feature.Skill]

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
