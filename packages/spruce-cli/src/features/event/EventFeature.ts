import diskUtil from '../../utilities/disk.utility'
import AbstractFeature from '../AbstractFeature'
import { FeatureCode } from '../features.types'

export default class EventFeature extends AbstractFeature {
	public code: FeatureCode = 'event'
	public nameReadable = 'Event'
	public description =
		'Plug into the Mercury XP and start creating experiences!'
	public dependencies: FeatureCode[] = ['skill']
	protected actionsDir = diskUtil.resolvePath(__dirname, 'actions')

	public async isInstalled(): Promise<boolean> {
		return diskUtil.doesDirExist(
			diskUtil.resolvePath(this.cwd, 'src', 'events')
		)
	}

	public async afterPackageInstall() {
		diskUtil.createDir(diskUtil.resolvePath(this.cwd, 'src', 'events'))
	}
}
