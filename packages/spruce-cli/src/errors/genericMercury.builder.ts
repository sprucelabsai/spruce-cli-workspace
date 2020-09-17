import { buildErrorSchema } from '@sprucelabs/schema'

const genericMercuryDefinition = buildErrorSchema({
	id: 'genericMercury',
	name: 'Generic mercury',
	description:
		'Not sure what happened, but it has something to do with Mercury',
	fields: {
		eventName: {
			type: 'text',
			label: 'Event name',
		},
		payloadArgs: {
			type: 'schema',
			label: 'Payload',
			hint: 'A hint',
			isArray: true,
			options: {
				schema: {
					id: 'payloadArgs',
					name: 'Payload args',
					fields: {
						name: {
							type: 'text',
							label: 'name',
						},
						value: {
							type: 'text',
							label: 'value',
						},
					},
				},
			},
		},
	},
})

export default genericMercuryDefinition
