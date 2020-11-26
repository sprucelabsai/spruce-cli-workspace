import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import eventListenActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/listenEventAction.schema'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

export default class ListenAction extends AbstractFeatureAction<SpruceSchemas.SpruceCli.v2020_07_22.ListenEventActionSchema> {
	public name = 'listen'
	public optionsSchema: SpruceSchemas.SpruceCli.v2020_07_22.ListenEventActionSchema = eventListenActionSchema

	public async execute(
		options: SpruceSchemas.SpruceCli.v2020_07_22.ListenEventAction
	): Promise<FeatureActionResponse> {
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

		const generator = this.Generator('event')
		const results = await generator.generateListener(resolvedDestination, {
			...normalizedOptions,
			version: resolvedVersion,
		})

		return { files: results }
	}
}
