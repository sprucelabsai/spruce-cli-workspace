import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import AbstractFeature, { FeatureDependency } from '../AbstractFeature'
import { FeatureCode } from '../features.types'

declare module '../../features/features.types' {
	interface FeatureMap {
		sandbox: SandboxFeature
	}
}

export default class SandboxFeature extends AbstractFeature {
	public code: FeatureCode = 'sandbox'
	public nameReadable = 'Sandbox'
	public description =
		'For getting your skill up-and-running on sandbox.mercury.spruce.ai.'
	public dependencies: FeatureDependency[] = [
		{
			code: 'event',
			isRequired: true,
		},
	]
	public packageDependencies = []

	protected actionsDir = diskUtil.resolvePath(__dirname, 'actions')

	public isInstalled = async (): Promise<boolean> => {
		return this.featureInstaller.isInstalled('event')
	}
}
