import { INpmPackage } from '../types/cli.types'
import AbstractFeature from './AbstractFeature'
import { FeatureCode } from './FeatureManager'

export default class ErrorFeature extends AbstractFeature {
	public description =
		'Errors: Use schemas to define your errors and get great type checking!'

	public dependencies = [FeatureCode.Schema]

	public packages: INpmPackage[] = [
		{
			name: '@sprucelabs/error',
		},
	]

	public async isInstalled() {
		return this.PkgService().isInstalled('@sprucelabs/error')
	}
}
