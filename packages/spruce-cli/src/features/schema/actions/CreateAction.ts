import { SchemaValues, buildSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import NamedTemplateItemSchema from '#spruce/schemas/local/v2020_07_22/namedTemplateItem.schema'
import AbstractFeatureAction from '../../../featureActions/AbstractFeatureAction'
import SchemaGenerator from '../../../generators/SchemaGenerator'
import diskUtil from '../../../utilities/disk.utility'
import namesUtil from '../../../utilities/names.utility'
import { IFeatureAction } from '../../features.types'
import {
	ISyncSchemasActionDefinition,
	syncSchemasActionOptionsDefinition,
} from './SyncAction'

const createSchemaActionDefinition = buildSchema({
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
		},
		builderFunction: {
			type: FieldType.Text,
			label: 'Builder function',
			hint: 'The function that builds this schema',
			defaultValue: 'buildSchema',
			isPrivate: true,
		},
		syncAfterCreate: {
			type: FieldType.Boolean,
			label: 'Sync after creation',
			hint:
				'This will ensure types and schemas are in sync after you create your builder.',
			isPrivate: true,
			defaultValue: true,
		},
		nameReadable: NamedTemplateItemSchema.fields.nameReadable,
		namePascal: NamedTemplateItemSchema.fields.namePascal,
		nameCamel: NamedTemplateItemSchema.fields.nameCamel,
		description: NamedTemplateItemSchema.fields.description,
	},
})

export type ICreateSchemaActionDefinition = typeof createSchemaActionDefinition

export default class CreateAction extends AbstractFeatureAction<
	ICreateSchemaActionDefinition
> {
	public name = 'create'
	public optionsSchema = createSchemaActionDefinition

	public async execute(options: SchemaValues<ICreateSchemaActionDefinition>) {
		const normalizedOptions = this.validateAndNormalizeOptions(options)

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
