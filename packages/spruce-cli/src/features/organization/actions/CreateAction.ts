import { eventResponseUtil } from '@sprucelabs/mercury-types'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import createOrganizationActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/createOrganizationAction.schema'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

type OptionsSchema = SpruceSchemas.SpruceCli.v2020_07_22.CreateOrganizationActionSchema
type Options = SpruceSchemas.SpruceCli.v2020_07_22.CreateOrganizationAction

export default class CreateAction extends AbstractFeatureAction<OptionsSchema> {
	public name = 'create'
	public optionsSchema = createOrganizationActionSchema

	public async execute(options: Options): Promise<FeatureActionResponse> {
		const { nameReadable, nameKebab } = this.validateAndNormalizeOptions(
			options
		)

		const client = await this.connectToApi()

		const results = await client.emit('create-organization', {
			payload: {
				name: nameReadable,
				slug: nameKebab,
			},
		})

		const { organization } = eventResponseUtil.getFirstResponseOrThrow(results)

		return {
			meta: {
				organization,
			},
		}
	}
}
