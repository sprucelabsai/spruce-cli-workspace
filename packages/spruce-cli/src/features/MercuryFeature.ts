import { Feature } from '#spruce/autoloaders/features'
import AbstractFeature, { IFeaturePackage } from './AbstractFeature'

export default class MercuryFeature extends AbstractFeature {
	public description = 'Mercury: communicate with Spruce and other skills'

	public featureDependencies = [Feature.Schema]

	public packages: IFeaturePackage[] = [
		{
			name: '@sprucelabs/mercury'
		}
	]

	public async isInstalled() {
		return this.services.pkg.isInstalled('@sprucelabs/mercury')
	}
}
