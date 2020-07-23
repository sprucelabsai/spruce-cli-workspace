import {
	buildSchemaDefinition,
	SchemaDefinitionValues,
} from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import namedTemplateItemDefinition from '#spruce/schemas/local/namedTemplateItem.definition'
import SpruceError from '../../../errors/SpruceError'
import AbstractFeatureAction from '../../../featureActions/AbstractFeatureAction'
import ErrorGenerator from '../../../generators/ErrorGenerator'
import diskUtil from '../../../utilities/disk.utility'
import namesUtil from '../../../utilities/names.utility'
import { IFeatureActionExecuteResponse } from '../../features.types'
import { syncErrorsActionOptionsDefinition } from './SyncAction'

const createErrorActionDefinition = buildSchemaDefinition({
	id: 'createErrorActionDefinition',
	name: 'Create error',
	description: 'Create a builder for a new error!',
	fields: {
		...syncErrorsActionOptionsDefinition.fields,
		errorBuilderDestinationDir: {
			type: FieldType.Text,
			label: 'Error destination directory',
			isRequired: true,
			hint:
				'Where should I write your new definition and the Error class file?',
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

		const {
			errorBuilderDestinationDir,
			nameCamel,
			namePascal,
			nameReadable,
			description,
		} = normalizedOptions

		// const resolvedErrorFileDestination = diskUtil.resolvePath(
		// 	this.cwd,
		// 	errorBuilderDestinationDir,
		// 	'SpruceError.ts'
		// )

		const resolvedErrorBuilderDestinationDir = diskUtil.resolvePath(
			this.cwd,
			errorBuilderDestinationDir
		)

		const errorGenerator = new ErrorGenerator(this.templates)
		const builderGeneratedFiles = await errorGenerator.generateBuilder(
			resolvedErrorBuilderDestinationDir,
			{
				nameCamel,
				namePascal: namePascal ?? namesUtil.toPascal(nameCamel),
				nameReadable: nameReadable ?? nameCamel,
				description,
			}
		)

		const syncResults = await this.Action('sync').execute(normalizedOptions)

		return { files: [...builderGeneratedFiles, ...(syncResults.files ?? [])] }
	}
}
