import { buildSchemaDefinition } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

export default buildSchemaDefinition({
	id: 'namedTemplateItem',
	name: 'NamedTemplateItem',
	description: 'Used to collect input on the names of a class or interface',
	fields: {
		nameReadable: {
			type: FieldType.Text,
			label: 'Readable name',
			isRequired: true,
			hint: 'The name people will read',
		},
		nameCamel: {
			type: FieldType.Text,
			label: 'Camel case name',
			isRequired: true,
			hint: 'camelCase version of the name',
		},
		nameCamelPlural: {
			type: FieldType.Text,
			label: 'Plural camel case name',
			isRequired: true,
			hint: 'camelCase version of the name',
		},
		namePascal: {
			type: FieldType.Text,
			label: 'Pascal case name',
			isRequired: true,
			hint: 'PascalCase of the name',
		},
		namePascalPlural: {
			type: FieldType.Text,
			label: 'Plural Pascal case name',
			isRequired: true,
			hint: 'PascalCase of the name',
		},
		nameConst: {
			type: FieldType.Text,
			label: 'Constant case name',
			isRequired: true,
			hint: 'CONST_CASE of the name',
		},
		description: {
			type: FieldType.Text,
			isRequired: true,
			label: 'Description',
			description: 'Describe a bit more here',
		},
	},
})
