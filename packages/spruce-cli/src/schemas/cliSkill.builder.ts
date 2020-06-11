import { buildSchemaDefinition } from '@sprucelabs/schema'
import skillDefinition from '#spruce/schemas/core/skill.definition'

export default buildSchemaDefinition({
	...skillDefinition,
	id: 'cliSkill',
	description: 'A stripped down skill for the cli',
	fields: {
		id: skillDefinition.fields.id,
		apiKey: skillDefinition.fields.apiKey,
		name: skillDefinition.fields.name,
		slug: skillDefinition.fields.slug
	}
})
