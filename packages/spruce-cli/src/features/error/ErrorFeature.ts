import { INpmPackage } from '../../types/cli.types'
import diskUtil from '../../utilities/disk.utility'
import AbstractFeature from '../AbstractFeature'
import { FeatureCode } from '../features.types'

export default class ErrorFeature extends AbstractFeature {
	public nameReadable = 'Error'
	public description =
		'Errors: Use schemas to define your errors and get great type checking!'

	public dependencies: FeatureCode[] = ['schema']
	public packageDependencies: INpmPackage[] = [
		{
			name: '@sprucelabs/error',
		},
	]
	public code: FeatureCode = 'error'
	protected actionsDir = diskUtil.resolvePath(__dirname, 'actions')

	public async isInstalled() {
		return this.Service('pkg').isInstalled('@sprucelabs/error')
	}
}
