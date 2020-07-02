import { Service } from '../factories/ServiceFactory'
import { FeatureCode } from '../FeatureManager'
import PkgService from '../services/PkgService'
import { INpmPackage } from '../types/cli.types'
import tsConfigUtil from '../utilities/tsConfig.utility'
import AbstractFeature from './AbstractFeature'

export default class SchemaFeature extends AbstractFeature {
	public description = 'Define, validate, and normalize everything.'

	public dependencies = [FeatureCode.Skill]

	public packageDependencies: INpmPackage[] = [
		{
			name: '@sprucelabs/schema'
		},
		{
			name: 'tsconfig-paths',
			isDev: true
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

	private PkgService(): PkgService {
		return this.serviceFactory.Service(this.cwd, Service.Pkg)
	}
}
