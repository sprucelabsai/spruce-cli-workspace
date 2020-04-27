import log from '../lib/log'
import AbstractFeature, { IFeaturePackage } from './AbstractFeature'
import { Feature } from '../../.spruce/autoloaders/features'

export default class TestFeature extends AbstractFeature {
	public featureDependencies = [Feature.Schema]

	public packages: IFeaturePackage[] = [
		{ name: '@sprucelabs/test', isDev: true },
		{ name: 'ts-node', isDev: true }
	]

	public async install(options?: Record<string, any>) {
		log.debug('Install!', { options })
	}

	// TODO
	public async isInstalled() {
		return false
	}
}
