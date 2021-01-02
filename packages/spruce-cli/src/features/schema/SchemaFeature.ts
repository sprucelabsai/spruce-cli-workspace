import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { NpmPackage } from '../../types/cli.types'
import AbstractFeature, {
	FeatureDependency,
	InstallResults,
} from '../AbstractFeature'
import { FeatureCode } from '../features.types'

export default class SchemaFeature extends AbstractFeature {
	public nameReadable = 'Schema'
	public description = 'Define, validate, and normalize everything.'
	public dependencies: FeatureDependency[] = [
		{ code: 'skill', isRequired: false },
		{ code: 'node', isRequired: true },
	]
	public packageDependencies: NpmPackage[] = [
		{
			name: '@sprucelabs/schema',
		},
		{
			name: '@sprucelabs/spruce-core-schemas',
		},
		{ name: '@sprucelabs/babel-plugin-schema', isDev: true },
	]

	public code: FeatureCode = 'schema'

	protected actionsDir = diskUtil.resolvePath(__dirname, 'actions')

	public async afterPackageInstall(): Promise<InstallResults> {
		const isSkillInstalled = await this.featureInstaller.isInstalled('skill')

		if (!isSkillInstalled) {
			return {}
		}

		const plugin = this.templates.schemaPlugin()
		const destination = this.getPluginDestination()

		diskUtil.writeFile(destination, plugin)

		return {
			files: [
				{
					name: 'schema.plugin.ts',
					path: destination,
					action: 'generated',
					description: 'Enables schema support in your skill!',
				},
			],
		}
	}

	private getPluginDestination() {
		return diskUtil.resolveHashSprucePath(
			this.cwd,
			'features',
			'schema.plugin.ts'
		)
	}
}
