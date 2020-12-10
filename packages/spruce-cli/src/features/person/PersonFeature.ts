import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import AbstractFeature, { FeatureDependency } from '../AbstractFeature'
import { FeatureCode } from '../features.types'

export default class PersonFeature extends AbstractFeature {
	public code: FeatureCode = 'person'
	public nameReadable = 'Person'
	public description = 'Log in, log out, etc.'
	public dependencies: FeatureDependency[] = [
		{
			code: 'skill',
			isRequired: true,
		},
	]
	public packageDependencies = []

	protected actionsDir = diskUtil.resolvePath(__dirname, 'actions')

	public isInstalled = () => {
		return this.featureInstaller.isInstalled('skill')
	}
}
