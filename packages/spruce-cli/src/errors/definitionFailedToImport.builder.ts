import { buildErrorDefinition } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

export default buildErrorDefinition({
	id: 'definitionFailedToImport',
	name: 'Definition failed to import',
	description: 'The definition file failed to import',
	fields: {
		file: {
			type: FieldType.Text,
			label: 'File',
			isRequired: true,
			hint: 'The file definition file I tried to import',
		},
	},
})
