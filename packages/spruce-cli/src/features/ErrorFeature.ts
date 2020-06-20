import { Feature } from '../FeatureManager'
import PkgService from '../services/PkgService'
import { INpmPackage } from '../types/cli.types'
import AbstractFeature from './AbstractFeature'

export default class ErrorFeature extends AbstractFeature {
	public description =
		'Errors: Use schemas to define your errors and get great type checking!'

	public featureDependencies = [Feature.Schema]

	public packages: INpmPackage[] = [
		{
			name: '@sprucelabs/error'
		}
	]

	protected packageService: PkgService
	public constructor(cwd: string, packageService: PkgService) {
		super(cwd)
		this.cwd = cwd
		this.packageService = packageService
	}

	public async isInstalled() {
		return this.packageService.isInstalled('@sprucelabs/error')
	}
}
