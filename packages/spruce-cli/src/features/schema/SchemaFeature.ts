import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { INpmPackage } from '../../types/cli.types'
import AbstractFeature from '../AbstractFeature'
import { FeatureCode } from '../features.types'

export default class SchemaFeature extends AbstractFeature {
	public nameReadable = 'Schema'
	public description = 'Define, validate, and normalize everything.'
	public dependencies: FeatureCode[] = ['skill']
	public packageDependencies: INpmPackage[] = [
		{
			name: '@sprucelabs/schema',
		},
	]

	public code: FeatureCode = 'schema'
	protected actionsDir = diskUtil.resolvePath(__dirname, 'actions')

	public async isInstalled() {
		try {
			return this.Service('pkg').isInstalled('@sprucelabs/schema')
		} catch {
			return false
		}
	}
}
