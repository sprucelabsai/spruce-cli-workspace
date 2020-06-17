import { buildErrorDefinition } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldType'

const transpileFailedDefinition = buildErrorDefinition({
	id: 'transpileFailed',
	name: 'Transpile failed',
	description: 'Could not transpile (ts -> js) a script',
	fields: {
		source: {
			type: FieldType.Text,
			label: 'Source',
			isRequired: true,
			hint: 'Source contents, should be typescript format'
		}
	}
})

export default transpileFailedDefinition
