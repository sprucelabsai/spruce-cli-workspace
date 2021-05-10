import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import createOrganizationActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/createOrganizationOptions.schema'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

type OptionsSchema =
	SpruceSchemas.SpruceCli.v2020_07_22.CreateOrganizationOptionsSchema
type Options = SpruceSchemas.SpruceCli.v2020_07_22.CreateOrganizationOptions

export default class CreateAction extends AbstractFeatureAction<OptionsSchema> {
	public code = 'create'
	public optionsSchema = createOrganizationActionSchema

	public async execute(options: Options): Promise<FeatureActionResponse> {
		const { nameReadable, nameKebab } =
			this.validateAndNormalizeOptions(options)

		const organization = await this.Store('organization').create({
			name: nameReadable,
			slug: nameKebab,
		})

		return {
			meta: {
				organization,
			},
		}
	}
}
