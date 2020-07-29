import { buildErrorSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

const genericMercuryDefinition = buildErrorSchema({
	id: 'genericMercury',
	name: 'Generic mercury',
	description:
		'Not sure what happened, but it has something to do with Mercury',
	fields: {
		eventName: {
			type: FieldType.Text,
			label: 'Event name',
		},
		payloadArgs: {
			type: FieldType.Schema,
			label: 'Payload',
			hint: 'A hint',
			isArray: true,
			options: {
				schema: {
					id: 'payloadArgs',
					name: 'Payload args',
					fields: {
						name: {
							type: FieldType.Text,
							label: 'name',
						},
						value: {
							type: FieldType.Text,
							label: 'value',
						},
					},
				},
			},
		},
	},
})

export default genericMercuryDefinition
