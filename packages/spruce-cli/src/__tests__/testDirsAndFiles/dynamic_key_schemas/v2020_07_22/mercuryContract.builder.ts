import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
	id: 'mercuryContract',
	name: 'Mercury Contract',
	description: '',
	version: '2020_09_01',
	dynamicFieldSignature: {
		type: 'schema',
		keyName: 'eventNameWithOptionalNamespace',
		options: {
			schemas: [
				{
					id: 'eventSignature',
					name: 'Event Signature',
					description: '',
					fields: {
						responsePayload: {
							type: 'raw',
							options: { valueType: 'SpruceSchema.ISchema' },
						},
						emitPayload: {
							type: 'raw',
							options: { valueType: 'SpruceSchema.ISchema' },
						},
						listenPermissionsAny: {
							type: 'text',
						},
						emitPermissionsAny: {
							type: 'text',
						},
					},
				},
				{
					id: 'eventSignature2',
					name: 'Event Signature2',
					description: '',
					fields: {
						responsePayload: {
							type: 'raw',
							options: { valueType: 'SpruceSchema.ISchema' },
						},
						emitPayload: {
							type: 'raw',
							options: { valueType: 'SpruceSchema.ISchema' },
						},
						listenPermissionsAny: {
							type: 'text',
						},
						emitPermissionsAny: {
							type: 'text',
						},
					},
				},
			],
		},
	},
})
