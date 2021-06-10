import { buildSchema, SchemaValues } from '@sprucelabs/schema'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import InFlightEntertainment from '../../../InFlightEntertainment'
import AbstractAction from '../../AbstractAction'
import { FeatureActionResponse } from '../../features.types'

const optionsSchema = buildSchema({
	id: 'updateDependenciesAction',
	description:
		'Clear lock files and node_modules and then reinstalls all modules.',
	fields: {},
})

type OptionsSchema = typeof optionsSchema
type Options = SchemaValues<OptionsSchema>
export default class UpdateDependenciesAction extends AbstractAction<OptionsSchema> {
	public code = 'updateDependencies'
	public optionsSchema = optionsSchema
	public commandAliases = ['update.dependencies']
	public invocationMessage = 'Updating dependencies... 💪'

	public async execute(_options: Options): Promise<FeatureActionResponse> {
		const files = ['package-lock.json', 'yarn.lock', 'node_modules']

		for (const file of files) {
			diskUtil.deleteFile(diskUtil.resolvePath(this.cwd, file))
		}

		InFlightEntertainment.start(['Here we go!', 'Good luck!'])

		await this.installDependencies()

		InFlightEntertainment.stop()

		return {
			headline: 'Update Complete!',
			summaryLines: ['All dependencies updated! 💪'],
		}
	}

	private async installDependencies() {
		const features = await this.featureInstaller.getInstalledFeatures()

		await this.featureInstaller.installPackageDependenciesForFeatures(
			features,
			(message: string) => {
				this.ui.startLoading(message)
			}
		)
	}
}
