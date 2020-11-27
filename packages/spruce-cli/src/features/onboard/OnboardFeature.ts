import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import AbstractFeature, { FeatureDependency } from '../AbstractFeature'
import { FeatureCode } from '../features.types'

export default class OnboardFeature extends AbstractFeature {
	public code: FeatureCode = 'onboard'
	public nameReadable = 'Onboard'
	public description = 'Get building your first skill already!'
	public dependencies: FeatureDependency[] = []
	public packageDependencies = []

	protected actionsDir = diskUtil.resolvePath(__dirname, 'actions')

	public isInstalled = async (): Promise<boolean> => {
		return true
	}
}
