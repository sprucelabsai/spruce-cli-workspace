import { buildSchemaDefinition, FieldType } from '@sprucelabs/schema'

const responsePayloadDefinition = buildSchemaDefinition({
	id: 'listEventsResponsePayload',
	name: 'List events response',
	description: 'A list of events',
	fields: {
		events: {
			type: FieldType.Schema,
			options: {
				schema: {
					id: 'listEventsResponsePayloadEvents',
					name: 'Event definition',
					fields: {
						eventName: {
							type: FieldType.Text,
							label:
								'The full event name including slug. i.e. "booking:get-appointments"'
						},
						slug: {
							type: FieldType.Text,
							label: 'The skill slug associated with this event'
						}
					}
				}
			}
		}
	}
})

export default responsePayloadDefinition
