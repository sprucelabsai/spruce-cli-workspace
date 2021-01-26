import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { NpmPackage } from '../../types/cli.types'
import AbstractFeature, {
	FeatureDependency,
	InstallResults,
} from '../AbstractFeature'
import { FeatureCode } from '../features.types'

export default class ConversationFeature extends AbstractFeature {
	public nameReadable = 'Conversation'
	public code: FeatureCode = 'conversation'
	public description = 'Computers like to talk, too.'

	public dependencies: FeatureDependency[] = [
		{ code: 'event', isRequired: true },
	]
	public packageDependencies: NpmPackage[] = [
		{
			name: '@sprucelabs/spruce-conversation-plugin',
			isDev: false,
		},
	]
	protected actionsDir = diskUtil.resolvePath(__dirname, 'actions')

	public async afterPackageInstall(): Promise<InstallResults> {
		const files = await this.Writer('conversation').writePlugin(this.cwd)

		return {
			files,
		}
	}
}
