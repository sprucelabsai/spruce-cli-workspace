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

const createErrorActionDefinition = buildSchemaDefinition({
	id: 'createErrorActionDefinition',
	name: 'Create error',
	description: 'Create a builder for a new error!',
	fields: {
		errorDestinationDir: {
			type: FieldType.Text,
			label: 'Error destination directory',
			isRequired: true,
			hint:
				'Where should I write your new definition and the Error class file?',
			defaultValue: './src/errors',
		},
		typesDestinationDir: {
			type: FieldType.Text,
			label: 'Types destination dir',
			isRequired: true,
			hint: 'This is where error options and type information will be written',
			defaultValue: '#spruce/errors',
		},
		schemaLookupDir: {
			type: FieldType.Text,
			label: 'Schema lookup dir',
			isRequired: true,
			hint: 'Where should I look for schemas?',
			defaultValue: './src/schemas',
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
		const {
			errorDestinationDir,
			nameCamel,
			namePascal,
			nameReadable,
			description,
		} = this.validateAndNormalizeOptions(options) as SchemaDefinitionValues<
			CreateErrorActionDefinition
		>

		// const resolvedErrorFileDestination = diskUtil.resolvePath(
		// 	this.cwd,
		// 	errorDestinationDir,
		// 	'SpruceError.ts'
		// )

		const resolvedErrorBuilderDestination = diskUtil.resolvePath(
			this.cwd,
			errorDestinationDir,
			`${nameCamel}.builder.ts`
		)

		if (diskUtil.doesFileExist(resolvedErrorBuilderDestination)) {
			throw new SpruceError({
				// @ts-ignore
				code: 'ERROR_EXISTS',
				name: nameCamel,
				errorDestinationDir,
				friendlyMessage: 'This error already exists!',
			})
		}

		const errorGenerator = new ErrorGenerator(this.templates)
		const builderGeneratedFiles = await errorGenerator.generateBuilder(
			resolvedErrorBuilderDestination,
			{
				nameCamel,
				namePascal: namePascal ?? namesUtil.toPascal(nameCamel),
				nameReadable: nameReadable ?? nameCamel,
				description,
			}
		)

		await this.getFeature('schema').Action('sync').execute({})

		return { files: builderGeneratedFiles }
	}
}
