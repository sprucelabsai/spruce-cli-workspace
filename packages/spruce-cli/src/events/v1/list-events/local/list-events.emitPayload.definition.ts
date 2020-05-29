import { buildSchemaDefinition, FieldType } from '@sprucelabs/schema'

const emitPayloadDefinition = buildSchemaDefinition({
	id: 'listEventsEmitPayload',
	name: 'List events payload',
	description: 'The payload for ListEvents',
	fields: {
		eventNames: {
			type: FieldType.Text,
			isArray: true,
			label: 'Limit search to event names'
		}
	}
})

export default emitPayloadDefinition
