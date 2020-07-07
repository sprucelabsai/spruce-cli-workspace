import { INpmPackage } from '../types/cli.types'
import AbstractFeature from './AbstractFeature'
import { FeatureCode } from './FeatureManager'

export default class SchemaFeature extends AbstractFeature {
	public description = 'Define, validate, and normalize everything.'

	public dependencies = [FeatureCode.Skill]

	public packageDependencies: INpmPackage[] = [
		{
			name: '@sprucelabs/schema'
		}
	]

	public async isInstalled() {
		return this.PkgService().isInstalled('@sprucelabs/schema')
	}
}
