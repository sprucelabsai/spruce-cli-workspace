import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
	id: 'setupVscodeAction',
	name: 'Setup vscode action',
	description: 'Install vscode extensions the Spruce team recommends!',
	fields: {
		all: {
			type: 'boolean',
			label: 'Install everything',
		},
	},
})
