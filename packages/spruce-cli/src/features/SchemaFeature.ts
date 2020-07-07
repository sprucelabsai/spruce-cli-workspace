import { Feature } from '#spruce/autoloaders/features'
import AbstractFeature, { IFeaturePackage } from './AbstractFeature'

export default class SchemaFeature extends AbstractFeature {
	public description = 'Schema: Define data for your skill'

	public featureDependencies = [Feature.Skill]

	public packages: IFeaturePackage[] = [
		{
			name: '@sprucelabs/schema'
		}
	]

	public async afterPackageInstall() {
		if (!this.utilities.tsConfig.isPathSet('#spruce/')) {
			this.utilities.tsConfig.setPath('#spruce/*', ['.spruce/*'], this.cwd)
		}
		if (!this.utilities.tsConfig.isPathSet('#spruce:schema/*')) {
			this.utilities.tsConfig.setPath('#spruce:schema/*', ['.spruce/schemas/*'])
		}
	}

	public async isInstalled() {
		return this.services.pkg.isInstalled('@sprucelabs/schema')
	}
}
