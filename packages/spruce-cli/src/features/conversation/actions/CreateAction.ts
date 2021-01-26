import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import createConversationTopicOptionsSchema from '#spruce/schemas/spruceCli/v2020_07_22/createConversationTopicOptions.schema'
import { GeneratedFile } from '../../../types/cli.types'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

type OptionsSchema = SpruceSchemas.SpruceCli.v2020_07_22.CreateConversationTopicOptionsSchema
type Options = SpruceSchemas.SpruceCli.v2020_07_22.CreateConversationTopicOptions
export default class CreateAction extends AbstractFeatureAction<OptionsSchema> {
	public code = 'create'
	public optionsSchema = createConversationTopicOptionsSchema

	public async execute(options: Options): Promise<FeatureActionResponse> {
		const { nameReadable, nameCamel } = this.validateAndNormalizeOptions(
			options
		)

		const filename = `${nameCamel}.topic.ts`
		const destination = diskUtil.resolvePath(
			this.cwd,
			'src',
			'conversations',
			filename
		)

		const contents = this.templates.conversationTopic({ nameReadable })

		diskUtil.writeFile(destination, contents)

		const file: GeneratedFile = {
			name: filename,
			path: destination,
			action: 'generated',
			description: `The definition talking about ${nameReadable.toLowerCase()}`,
		}

		return {
			files: [file],
		}
	}
}
