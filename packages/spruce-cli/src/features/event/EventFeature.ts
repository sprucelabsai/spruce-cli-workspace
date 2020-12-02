import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import AbstractFeature, { FeatureDependency } from '../AbstractFeature'
import { FeatureCode } from '../features.types'

export default class EventFeature extends AbstractFeature {
	public code: FeatureCode = 'event'
	public nameReadable = 'Event'
	public description =
		'Plug into the Mercury XP and start creating experiences!'
	public dependencies: FeatureDependency[] = []
	public packageDependencies = [
		{
			name: '@sprucelabs/mercury-client',
		},
		{
			name: '@sprucelabs/mercury-types',
		},
	]
	protected actionsDir = diskUtil.resolvePath(__dirname, 'actions')

	public async afterPackageInstall() {
		diskUtil.createDir(diskUtil.resolvePath(this.cwd, 'src', 'events'))
		return {}
	}
}
