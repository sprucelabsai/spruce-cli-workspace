import AbstractFeature, { IFeaturePackage } from './AbstractFeature'
import { Feature } from '#spruce/autoloaders/features'

export default class SchemaFeature extends AbstractFeature {
	public featureDependencies = [Feature.Skill]

	public packages: IFeaturePackage[] = [
		{
			name: '@sprucelabs/schema'
		}
	]

	// TODO
	public async isInstalled() {
		return this.services.pkg.isInstalled('@sprucelabs/schema')
	}
}
