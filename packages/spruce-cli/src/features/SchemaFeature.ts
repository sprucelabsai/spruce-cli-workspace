import { Feature } from '#spruce/autoloaders/features'
import AbstractFeature, { INpmPackage } from './AbstractFeature'

export default class SchemaFeature extends AbstractFeature {
	public description = 'Define, validate, and normalize everything.'

	public featureDependencies = [Feature.Skill]

	public packages: INpmPackage[] = [
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
