import { buildErrorDefinition } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

const valueTypeServiceStageErrorDefinition = buildErrorDefinition({
	id: 'valueTypeServiceStageError',
	name: 'Value type service stage error',
	description:
		'When collecting value types for all fields, something went wrong',
	fields: {
		stage: {
			type: FieldType.Text,
			label: 'Stage',
			isRequired: true
		}
	}
})

export default valueTypeServiceStageErrorDefinition
