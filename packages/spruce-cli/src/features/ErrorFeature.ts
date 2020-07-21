import { Service } from '../factories/ServiceFactory'
import { INpmPackage } from '../types/cli.types'
import AbstractFeature from './AbstractFeature'
import { FeatureCode } from './features.types'

export default class ErrorFeature extends AbstractFeature {
	public description =
		'Errors: Use schemas to define your errors and get great type checking!'

	public dependencies: FeatureCode[] = ['schema']
	public packageDependencies: INpmPackage[] = [
		{
			name: '@sprucelabs/error',
		},
	]
	public code: FeatureCode = 'error'

	public getActions() {
		return []
	}

	public async isInstalled() {
		return this.Service(Service.Pkg).isInstalled('@sprucelabs/error')
	}
}
