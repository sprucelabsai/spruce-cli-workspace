import { buildSchema } from '@sprucelabs/schema'

const fieldsSchema = buildSchema({
	id: 'generatedFileFields',
	fields: {
		name: {
			type: 'text',
			isRequired: true,
		},
		path: {
			type: 'text',
			isRequired: true,
		},
		description: {
			type: 'text',
		},
		action: {
			type: 'select',
			isRequired: true,
			options: {
				choices: [
					{
						label: 'Skipped',
						value: 'skipped',
					},
					{
						label: 'Generated',
						value: 'generated',
					},
					{
						label: 'Updated',
						value: 'updated',
					},
					{
						label: 'Deleted',
						value: 'deleted',
					},
				],
			},
		},
	},
})

export default buildSchema({
	id: 'watcherDidDetectChangesEmitPayload',
	name: 'Watcher did detect changes emit payload',
	fields: {
		changes: {
			type: 'schema',
			isRequired: true,
			isArray: true,
			options: {
				schemas: [
					buildSchema({
						id: 'generatedFile',
						fields: fieldsSchema.fields,
					}),
					buildSchema({
						id: 'generatedDir',
						fields: fieldsSchema.fields,
					}),
				],
			},
		},
	},
})
