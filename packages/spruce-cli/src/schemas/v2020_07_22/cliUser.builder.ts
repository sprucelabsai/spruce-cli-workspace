import { buildSchemaDefinition } from '@sprucelabs/schema'
import personDefinition from '#spruce/schemas/spruce/v2020_07_22/person.definition'

export default buildSchemaDefinition({
	...personDefinition,
	id: 'cliUser',
	description: 'A stripped down user for the cli',
	fields: {
		id: personDefinition.fields.id,
		casualName: personDefinition.fields.casualName,
	},
})
