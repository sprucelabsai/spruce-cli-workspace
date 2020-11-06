import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { NpmPackage } from '../../types/cli.types'
import AbstractFeature, {
	FeatureDependency,
	InstallResults,
} from '../AbstractFeature'
import { FeatureCode } from '../features.types'

export default class ErrorFeature extends AbstractFeature {
	public nameReadable = 'Error'
	public description =
		'Errors: Use schemas to define your errors and get great type checking!'

	public dependencies: FeatureDependency[] = [
		{ code: 'schema', isRequired: true },
		{ code: 'node', isRequired: true },
	]
	public packageDependencies: NpmPackage[] = [
		{
			name: '@sprucelabs/error',
		},
	]
	public code: FeatureCode = 'error'
	protected actionsDir = diskUtil.resolvePath(__dirname, 'actions')

	public async afterPackageInstall(): Promise<InstallResults> {
		const isSkillInstalled = await this.featureInstaller.isInstalled('skill')

		if (!isSkillInstalled) {
			return {}
		}

		const plugin = this.templates.errorPlugin()
		const destination = this.getPluginDestination()

		diskUtil.writeFile(destination, plugin)

		return {
			files: [
				{
					name: 'error.plugin.ts',
					path: destination,
					action: 'generated',
					description: 'Enables error support in your skill!',
				},
			],
		}
	}

	private getPluginDestination() {
		return diskUtil.resolveHashSprucePath(
			this.cwd,
			'features',
			'error.plugin.ts'
		)
	}
}
