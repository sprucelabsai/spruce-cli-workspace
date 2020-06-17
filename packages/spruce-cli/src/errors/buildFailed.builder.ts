import { buildErrorDefinition } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldType'

export default buildErrorDefinition({
	id: 'buildFailed',
	name: 'BuildFailed',
	description:
		'Error thrown when building or linting failed. Happens when a yarn command fails inside the package utility.',
	fields: {
		file: {
			type: FieldType.Text,
			label: 'File',
			hint:
				'File we wanted to build, if not set we wanted to build everything..'
		}
	}
})
