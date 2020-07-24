import {
	SchemaDefinitionValues,
	buildSchemaDefinition,
} from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import namedTemplateItemDefinition from '#spruce/schemas/local/namedTemplateItem.definition'
import AbstractFeatureAction from '../../../featureActions/AbstractFeatureAction'
import SchemaGenerator from '../../../generators/SchemaGenerator'
import diskUtil from '../../../utilities/disk.utility'
import namesUtil from '../../../utilities/names.utility'
import { IFeatureAction } from '../../features.types'
import {
	ISyncSchemasActionDefinition,
	syncSchemasActionOptionsDefinition,
} from './SyncAction'

const createSchemaActionDefinition = buildSchemaDefinition({
	id: 'createSchemaAction',
	name: 'Create schema',
	description: 'Create the builder to a fresh new schema!',
	fields: {
		...syncSchemasActionOptionsDefinition.fields,
		schemaBuilderDestinationDir: {
			type: FieldType.Text,
			label: 'Schema builder destination directory',
			hint: "Where I'll save the new schema builder.",
			defaultValue: 'src/schemas',
			isRequired: true,
		},
		builderFunction: {
			type: FieldType.Text,
			label: 'Builder function',
			hint: 'The function that builds this schema',
			isRequired: true,
			defaultValue: 'buildSchemaDefinition',
			isPrivate: true,
		},
		syncAfterCreate: {
			type: FieldType.Boolean,
			label: 'Sync after creation',
			hint:
				'This will ensure types and schemas are in sync after you create your builder.',
			isRequired: true,
			isPrivate: true,
			defaultValue: true,
		},
		nameReadable: namedTemplateItemDefinition.fields.nameReadable,
		namePascal: namedTemplateItemDefinition.fields.namePascal,
		nameCamel: namedTemplateItemDefinition.fields.nameCamel,
		description: namedTemplateItemDefinition.fields.description,
	},
})

export type ICreateSchemaActionDefinition = typeof createSchemaActionDefinition

export default class CreateAction extends AbstractFeatureAction<
	ICreateSchemaActionDefinition
> {
	public name = 'create'
	public optionsDefinition = createSchemaActionDefinition

	public async execute(
		options: SchemaDefinitionValues<ICreateSchemaActionDefinition>
	) {
		const normalizedOptions = this.validateAndNormalizeOptions(
			options
		) as SchemaDefinitionValues<ICreateSchemaActionDefinition>

		const {
			schemaBuilderDestinationDir,
			nameCamel,
			namePascal,
			nameReadable,
			syncAfterCreate,
			...rest
		} = normalizedOptions

		const resolvedDestination = diskUtil.resolvePath(
			this.cwd,
			schemaBuilderDestinationDir
		)

		const generator = new SchemaGenerator(this.templates)
		const results = await generator.generateBuilder(resolvedDestination, {
			...rest,
			nameCamel,
			nameReadable: nameReadable ?? nameCamel,
			namePascal: namePascal ?? namesUtil.toPascal(nameCamel),
		})

		const syncAction = this.Action('sync') as IFeatureAction<
			ISyncSchemasActionDefinition
		>

		if (syncAfterCreate) {
			const syncResults = await syncAction.execute({
				...rest,
			})

			results.push(...(syncResults.files ?? []))
		}

		return { files: results }
	}
}
