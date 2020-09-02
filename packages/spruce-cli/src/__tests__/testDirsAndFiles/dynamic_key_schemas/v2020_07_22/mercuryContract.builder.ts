import { buildSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

export default buildSchema({
	id: 'mercuryContract',
	name: 'Mercury Contract',
	description: '',
	version: '2020_09_01',
	dynamicKeySignature: {
		type: FieldType.Schema,
		key: 'eventNameWithOptionalNamespace',
		options: {
			schemas: [
				{
					id: 'eventSignature',
					name: 'Event Signature',
					description: '',
					fields: {
						responsePayload: {
							type: FieldType.Raw,
							options: { valueType: 'ISchema' },
						},
						emitPayload: {
							type: FieldType.Raw,
							options: { valueType: 'ISchema' },
						},
						listenPermissionsAny: {
							type: FieldType.Text,
						},
						emitPermissionsAny: {
							type: FieldType.Text,
						},
					},
				},
				{
					id: 'eventSignature2',
					name: 'Event Signature2',
					description: '',
					fields: {
						responsePayload: {
							type: FieldType.Raw,
							options: { valueType: 'ISchema' },
						},
						emitPayload: {
							type: FieldType.Raw,
							options: { valueType: 'ISchema' },
						},
						listenPermissionsAny: {
							type: FieldType.Text,
						},
						emitPermissionsAny: {
							type: FieldType.Text,
						},
					},
				},
			],
		},
	},
})
