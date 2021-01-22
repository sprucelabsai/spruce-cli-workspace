import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { NpmPackage } from '../../types/cli.types'
import AbstractFeature, {
	FeatureDependency,
	FeatureOptions,
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
		const isSkillInstalled = await this.featureInstaller.isInstalled('error')

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
		return this.Writer('error').writePlugin(this.cwd)
	}
}
