import AbstractFeature, { IFeaturePackage } from './AbstractFeature'
import { Feature } from '#spruce/autoloaders/features'

export default class SchemaFeature extends AbstractFeature {
	public description = 'Schema: Define data for your skill'

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
