import {
	buildSchemaDefinition,
	SchemaDefinitionValues,
} from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import namedTemplateItemDefinition from '#spruce/schemas/local/namedTemplateItem.definition'
import AbstractFeatureAction from '../../../featureActions/AbstractFeatureAction'
import {
	IFeatureAction,
	IFeatureActionExecuteResponse,
} from '../../features.types'
import { ICreateSchemaActionDefinition } from '../../schema/actions/CreateAction'
import { syncErrorsActionOptionsDefinition } from './SyncAction'

const createErrorActionDefinition = buildSchemaDefinition({
	id: 'createErrorActionDefinition',
	name: 'Create error',
	description: 'Create a builder for a new error!',
	fields: {
		...syncErrorsActionOptionsDefinition.fields,
		errorBuilderDestinationDir: {
			type: FieldType.Text,
			label: 'Error builder destination directory',
			isRequired: true,
			hint: "Where I'll save your new builder and Error class file?",
			defaultValue: './src/errors',
		},
		nameReadable: namedTemplateItemDefinition.fields.nameReadable,
		namePascal: namedTemplateItemDefinition.fields.namePascal,
		nameCamel: namedTemplateItemDefinition.fields.nameCamel,
		description: namedTemplateItemDefinition.fields.description,
	},
})

type CreateErrorActionDefinition = typeof createErrorActionDefinition

export default class CreateAction extends AbstractFeatureAction<
	CreateErrorActionDefinition
> {
	public name = 'create'
	public optionsDefinition = createErrorActionDefinition

	public async execute(
		options: SchemaDefinitionValues<CreateErrorActionDefinition>
	): Promise<IFeatureActionExecuteResponse> {
		const normalizedOptions = this.validateAndNormalizeOptions(
			options
		) as SchemaDefinitionValues<CreateErrorActionDefinition>

		const schemaCreateAction = this.getFeature('schema').Action(
			'create'
		) as IFeatureAction<ICreateSchemaActionDefinition>

		const createResults = await schemaCreateAction.execute({
			...normalizedOptions,
			builderFunction: 'buildErrorDefinition',
			enableVersioning: false,
			syncAfterCreate: false,
			schemaBuilderDestinationDir: normalizedOptions.errorBuilderDestinationDir,
		})

		const syncResults = await this.Action('sync').execute(normalizedOptions)

		return {
			files: [...(createResults.files ?? []), ...(syncResults.files ?? [])],
		}
	}
}
