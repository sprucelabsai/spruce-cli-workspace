import { buildSchema } from '@sprucelabs/schema'
import personSchema from '#spruce/schemas/spruce/v2020_07_22/person.schema'

export default buildSchema({
	id: 'cliUser',
	description: 'A stripped down user for the cli',
	fields: {
		id: personSchema.fields.id,
		casualName: personSchema.fields.casualName,
	},
})
