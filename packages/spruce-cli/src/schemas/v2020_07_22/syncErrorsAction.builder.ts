import { buildSchema } from '@sprucelabs/schema'
import syncSchemasActionBuilder from './syncSchemasAction.builder'

export default buildSchema({
	id: 'syncErrorAction',
	name: 'Sync error action',
	description: 'Keep your errors types in sync with your builders',
	fields: {
		addonsLookupDir: syncSchemasActionBuilder.fields.addonsLookupDir,
		errorClassDestinationDir: {
			type: 'text',
			label: 'Error class destination',
			isRequired: true,
			isPrivate: true,
			hint: "Where I'll save your new Error class file?",
			defaultValue: 'src/errors',
		},
		errorLookupDir: {
			type: 'text',
			hint: 'Where I should look for your error builders?',
			defaultValue: 'src/errors',
		},
		errorTypesDestinationDir: {
			type: 'text',
			label: 'Types destination dir',
			hint: 'This is where error options and type information will be written',
			defaultValue: '#spruce/errors',
		},
	},
})
