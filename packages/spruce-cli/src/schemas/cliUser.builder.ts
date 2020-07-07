import { buildSchemaDefinition } from '@sprucelabs/schema'
import userDefinition from '#spruce/schemas/core/user.definition'

export default buildSchemaDefinition({
	...userDefinition,
	id: 'cliUser',
	description: 'A stripped down user for the cli',
	fields: {
		id: userDefinition.fields.id,
		casualName: userDefinition.fields.casualName,
	},
})
