import { normalizeSchemaValues } from '@sprucelabs/schema'
import createErrorActionSchema from '#spruce/schemas/local/v2020_07_22/createErrorAction.schema'
import syncErrorActionSchema from '#spruce/schemas/local/v2020_07_22/syncErrorAction.schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import {
	IFeatureAction,
	IFeatureActionExecuteResponse,
} from '../../features.types'

export default class CreateAction extends AbstractFeatureAction<
	SpruceSchemas.Local.v2020_07_22.ICreateErrorActionSchema
> {
	public name = 'create'
	public optionsSchema = createErrorActionSchema

	public async execute(
		options: SpruceSchemas.Local.v2020_07_22.ICreateErrorAction
	): Promise<IFeatureActionExecuteResponse> {
		const normalizedOptions = this.validateAndNormalizeOptions(options)

		const schemaCreateAction = this.getFeature('schema').Action(
			'create'
		) as IFeatureAction<
			SpruceSchemas.Local.v2020_07_22.ICreateSchemaActionSchema
		>

		const createResults = await schemaCreateAction.execute({
			...normalizedOptions,
			builderFunction: 'buildErrorSchema',
			enableVersioning: false,
			syncAfterCreate: false,
			schemaBuilderDestinationDir: normalizedOptions.errorBuilderDestinationDir,
		})

		const syncOptions = normalizeSchemaValues(
			syncErrorActionSchema,
			normalizedOptions
		)
		const syncResults = await this.Action('sync').execute(syncOptions)

		return {
			files: [...(createResults.files ?? []), ...(syncResults.files ?? [])],
		}
	}
}
