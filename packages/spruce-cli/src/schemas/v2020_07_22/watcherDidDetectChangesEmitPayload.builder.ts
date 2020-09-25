import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
	id: 'watcherDidDetectChangesEmitPayload',
	name: 'Watcher did detect changes emit payload',
	description: '',
	fields: {
		changes: {
			type: 'raw',
			label: 'First Field',
			isRequired: true,
			isArray: true,
			options: {
				valueType: 'GeneratedFileOrDir',
			},
		},
	},
})
