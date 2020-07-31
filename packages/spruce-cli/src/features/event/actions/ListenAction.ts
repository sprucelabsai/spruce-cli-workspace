import eventListenActionSchema from '#spruce/schemas/local/v2020_07_22/listenEventAction.schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import AbstractFeatureAction from '../../../featureActions/AbstractFeatureAction'
import EventGenerator from '../../../generators/EventGenerator'
import diskUtil from '../../../utilities/disk.utility'
import { IFeatureActionExecuteResponse } from '../../features.types'

export default class ListenAction extends AbstractFeatureAction<
	SpruceSchemas.Local.v2020_07_22.IListenEventActionSchema
> {
	public name = 'listen'
	public optionsSchema: SpruceSchemas.Local.v2020_07_22.IListenEventActionSchema = eventListenActionSchema

	public async execute(
		options: SpruceSchemas.Local.v2020_07_22.IListenEventAction
	): Promise<IFeatureActionExecuteResponse> {
		const normalizedOptions = this.validateAndNormalizeOptions(options)

		const { eventsDestinationDir, version } = normalizedOptions

		const resolvedDestination = diskUtil.resolvePath(
			this.cwd,
			eventsDestinationDir
		)

		const resolvedVersion = await this.resolveVersion(
			version,
			resolvedDestination
		)

		const generator = new EventGenerator(this.templates)
		const results = generator.generateListener(resolvedDestination, {
			...normalizedOptions,
			version: resolvedVersion,
		})

		return { files: results }
	}
}
