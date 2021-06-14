import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import AbstractFeature, { FeatureDependency } from '../AbstractFeature'
import { FeatureActionOptions, FeatureCode } from '../features.types'

declare module '../../features/features.types' {
	interface FeatureMap {
		sandbox: SandboxFeature
	}
}

export default class SandboxFeature extends AbstractFeature {
	public code: FeatureCode = 'sandbox'
	public nameReadable = 'Sandbox'
	public description =
		'For getting your skill up-and-running on sandbox.mercury.spruce.ai.'
	public dependencies: FeatureDependency[] = [
		{
			code: 'event',
			isRequired: true,
		},
	]
	public packageDependencies = []
	public actionsDir = diskUtil.resolvePath(__dirname, 'actions')

	public constructor(options: FeatureActionOptions) {
		super(options)

		void this.emitter.on('feature.did-execute', async (payload) => {
			const isSkillInstalled = await this.featureInstaller.isInstalled(
				'sandbox'
			)
			if (
				isSkillInstalled &&
				payload.featureCode === 'skill' &&
				payload.actionCode === 'upgrade'
			) {
				return this.Action('sandbox', 'setup').execute({})
			}

			return {}
		})
	}
}
