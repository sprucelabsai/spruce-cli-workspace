import { buildSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import namedTemplateItemSchema from '#spruce/schemas/spruceCli/v2020_07_22/namedTemplateItem.schema'
import syncSchemasActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/syncSchemasAction.schema'

export default buildSchema({
	id: 'createSchemaAction',
	name: 'Create schema action',
	description: 'Create the builder to a fresh new schema!',
	fields: {
		...syncSchemasActionSchema.fields,
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
		version: {
			type: FieldType.Text,
			label: 'Version',
			hint: 'Set a version yourself instead of letting me generate one for you',
			isPrivate: true,
		},
		nameReadable: namedTemplateItemSchema.fields.nameReadable,
		namePascal: namedTemplateItemSchema.fields.namePascal,
		nameCamel: namedTemplateItemSchema.fields.nameCamel,
		description: namedTemplateItemSchema.fields.description,
	},
})
