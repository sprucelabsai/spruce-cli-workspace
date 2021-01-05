import { normalizeSchemaValues } from '@sprucelabs/schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import createErrorActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/createErrorAction.schema'
import createSchemaActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/createSchemaAction.schema'
import syncErrorActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/syncErrorAction.schema'
import mergeUtil from '../../../utilities/merge.utility'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

type OptionsSchema = SpruceSchemas.SpruceCli.v2020_07_22.CreateErrorActionSchema
type Options = SpruceSchemas.SpruceCli.v2020_07_22.CreateErrorAction
export default class CreateAction extends AbstractFeatureAction<OptionsSchema> {
	public code = 'create'
	public optionsSchema = createErrorActionSchema

	public async execute(options: Options): Promise<FeatureActionResponse> {
		const normalizedOptions = this.validateAndNormalizeOptions(options)

		const schemaCreateAction = this.getFeature(
			'schema'
		).Action<SpruceSchemas.SpruceCli.v2020_07_22.CreateSchemaActionSchema>(
			'create'
		)

		const createSchemaOptions = normalizeSchemaValues(
			createSchemaActionSchema,
			{
				...normalizedOptions,
				builderFunction: 'buildErrorSchema',
				enableVersioning: false,
				syncAfterCreate: false,
				schemaBuilderDestinationDir:
					normalizedOptions.errorBuilderDestinationDir,
			}
		)

		const createResults = await schemaCreateAction.execute(createSchemaOptions)

		const syncOptions = normalizeSchemaValues(
			syncErrorActionSchema,
			normalizedOptions
		)
		const syncResults = await this.Action('sync').execute(syncOptions)
		const mergedResults = mergeUtil.mergeActionResults(
			createResults,
			syncResults
		)

		return mergedResults
	}
}
