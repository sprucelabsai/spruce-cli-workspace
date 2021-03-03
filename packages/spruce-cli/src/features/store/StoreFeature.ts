/* eslint-disable no-unreachable */
import { diskUtil, HealthCheckItem } from '@sprucelabs/spruce-skill-utils'
import AbstractFeature, { FeatureDependency } from '../AbstractFeature'
import { FeatureCode } from '../features.types'

declare module '../../features/features.types' {
	interface FeatureMap {
		store: StoreFeature
	}
}

export default class StoreFeature extends AbstractFeature {
	public nameReadable = 'Stores'
	public description = 'For working with remote places of storage.'
	public code: FeatureCode = 'store'
	public dependencies: FeatureDependency[] = [
		{
			code: 'skill',
			isRequired: true,
		},
	]
	public packageDependencies = [
		{ name: '@sprucelabs/data-stores', isDev: false },
	]

	protected actionsDir = diskUtil.resolvePath(__dirname, 'actions')

	public async afterPackageInstall() {
		const files = await this.Writer('store').writePlugin(this.cwd)
		return {
			files,
		}
	}
}
