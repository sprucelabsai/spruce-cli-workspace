import { buildSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

export default buildSchema({
	id: 'setupVscodeAction',
	name: 'Setup vscode action',
	description: 'Install vscode extensions the Spruce team recommends!',
	fields: {
		all: {
			type: FieldType.Boolean,
			label: 'Install everything',
		},
	},
})
