import { buildSchemaDefinition, FieldType } from '@sprucelabs/schema'

const testThingsEmitPayloadDefinition = buildSchemaDefinition({
	id: 'testThingsEmitPayload',
	name: 'test things',
	description: 'Emit Payload: asdlkfjalkdfjg',
	fields: {
		fieldName1: {
			type: FieldType.Boolean,
			label: 'First Field',
			isRequired: true
		},
		fieldName2: {
			type: FieldType.Number,
			label: 'Second Field',
			isRequired: true,
			hint: 'A hint'
		}
	}
})

export default testThingsEmitPayloadDefinition
