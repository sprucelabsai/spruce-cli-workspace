import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { NpmPackage } from '../../types/cli.types'
import AbstractFeature, {
	FeatureDependency,
	FeatureOptions,
	InstallResults,
} from '../AbstractFeature'
import { FeatureCode } from '../features.types'

declare module '../../features/features.types' {
	interface FeatureMap {
		schema: SchemaFeature
	}

	interface FeatureOptionsMap {
		schema: undefined
	}
}

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
		{ name: '@sprucelabs/resolve-path-aliases', isDev: true },
	]

	public code: FeatureCode = 'schema'

	public actionsDir = diskUtil.resolvePath(__dirname, 'actions')

	public constructor(options: FeatureOptions) {
		super(options)

		void this.emitter.on(
			'feature.did-execute',
			this.handleDidExecuteFeature.bind(this)
		)
	}

	private async handleDidExecuteFeature(payload: {
		actionCode: string
		featureCode: string
	}) {
		const isSkillInstalled = await this.featureInstaller.isInstalled('schema')

		if (!isSkillInstalled) {
			return {}
		}

		if (payload.featureCode === 'skill' && payload.actionCode === 'upgrade') {
			const files = await this.writePlugin()
			return { files }
		}

		return {}
	}

	public async afterPackageInstall(): Promise<InstallResults> {
		const isSkillInstalled = await this.featureInstaller.isInstalled('skill')

		if (!isSkillInstalled) {
			return {}
		}

		const files = await this.writePlugin()

		return {
			files,
		}
	}

	private async writePlugin() {
		return this.Writer('schema').writePlugin(this.cwd)
	}
}
