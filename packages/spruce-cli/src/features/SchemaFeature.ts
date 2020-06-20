import { Feature } from '../FeatureManager'
import PkgService from '../services/PkgService'
import { INpmPackage } from '../types/cli.types'
import tsConfigUtil from '../utilities/tsConfig.utility'
import AbstractFeature from './AbstractFeature'

export default class SchemaFeature extends AbstractFeature {
	public description = 'Define, validate, and normalize everything.'

	public featureDependencies = [Feature.Skill]

	public packageDependencies: INpmPackage[] = [
		{
			name: '@sprucelabs/schema'
		}
	]

	protected pkgService: PkgService

	public constructor(cwd: string, pkgService: PkgService) {
		super(cwd)
		this.pkgService = pkgService
	}

	public async afterPackageInstall() {
		if (!tsConfigUtil.isPathAliasSet(this.cwd, '#spruce/')) {
			tsConfigUtil.setPathAlias(this.cwd, '#spruce/*', ['.spruce/*'])
		}
		if (!tsConfigUtil.isPathAliasSet(this.cwd, '#spruce:schema/*')) {
			tsConfigUtil.setPathAlias(this.cwd, '#spruce:schema/*', [
				'.spruce/schemas/*'
			])
		}
	}

	public async isInstalled() {
		return this.pkgService.isInstalled('@sprucelabs/schema')
	}
}
