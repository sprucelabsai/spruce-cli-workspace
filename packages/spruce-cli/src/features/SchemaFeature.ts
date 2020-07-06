import { FeatureCode } from './FeatureManager'
import { INpmPackage } from '../types/cli.types'
import tsConfigUtil from '../utilities/tsConfig.utility'
import AbstractFeature from './AbstractFeature'

export default class SchemaFeature extends AbstractFeature {
	public description = 'Define, validate, and normalize everything.'

	public dependencies = [FeatureCode.Skill]

	public packageDependencies: INpmPackage[] = [
		{
			name: '@sprucelabs/schema'
		}
	]

	public async afterPackageInstall() {
		if (!tsConfigUtil.isPathAliasSet(this.cwd, '#spruce/*')) {
			tsConfigUtil.setPathAlias(this.cwd, '#spruce/*', ['.spruce/*'])
		}
	}

	public async isInstalled() {
		return this.PkgService().isInstalled('@sprucelabs/schema')
	}
}
