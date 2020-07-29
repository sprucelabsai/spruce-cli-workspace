import { buildSchemaDefinition } from '@sprucelabs/schema'
import skillDefinition from '#spruce/schemas/spruce/v2020_07_22/skill.definition'

export default buildSchemaDefinition({
	...skillDefinition,
	id: 'cliSkill',
	description: 'A stripped down skill for the cli',
	fields: {
		id: skillDefinition.fields.id,
		apiKey: skillDefinition.fields.apiKey,
		name: skillDefinition.fields.name,
		slug: skillDefinition.fields.slug,
	},
})
