import { Feature } from '#spruce/autoloaders/features'
import AbstractFeature, { IFeaturePackage } from './AbstractFeature'

export default class ErrorFeature extends AbstractFeature {
	public description =
		'Errors: Use schemas to define your errors and get great type checking!'

	public featureDependencies = [Feature.Schema]

	public packages: IFeaturePackage[] = [
		{
			name: '@sprucelabs/error'
		}
	]

	public async isInstalled() {
		return this.services.pkg.isInstalled('@sprucelabs/error')
	}
}
