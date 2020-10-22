import { buildSchema } from '@sprucelabs/schema'
import skillSchema from '#spruce/schemas/spruce/v2020_07_22/skill.schema'

export default buildSchema({
	id: 'cliSkill',
	description: 'A stripped down skill for the cli',
	fields: {
		id: skillSchema.fields.id,
		apiKey: skillSchema.fields.apiKey,
		name: skillSchema.fields.name,
		slug: skillSchema.fields.slug,
	},
})
