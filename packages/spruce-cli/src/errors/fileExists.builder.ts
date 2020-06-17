import { buildErrorDefinition } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldType'

const fileExistsDefinition = buildErrorDefinition({
	id: 'fileExists',
	name: 'fileExists',
	description: 'The file already exists',
	fields: {
		file: {
			type: FieldType.Text,
			label: 'File',
			isRequired: true,
			hint: 'The file being created'
		}
	}
})

export default fileExistsDefinition
