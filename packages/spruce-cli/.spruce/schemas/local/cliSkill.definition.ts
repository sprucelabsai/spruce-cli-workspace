import { FieldType } from '#spruce/schemas/fields/fieldType'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'

const cliSkillDefinition: SpruceSchemas.Local.CliSkill.IDefinition = {
	id: 'cliSkill',
	name: 'Skill',
	description: 'A stripped down skill for the cli',
	fields: {
		/** Id. */
		id: {
			label: 'Id',
			type: FieldType.Id,
			isRequired: true,
			options: undefined
		},
		/** Id. */
		apiKey: {
			label: 'Id',
			type: FieldType.Id,
			isRequired: true,
			options: undefined
		},
		/** Name. */
		name: {
			label: 'Name',
			type: FieldType.Text,
			isRequired: true,
			options: undefined
		},
		/** Slug. */
		slug: {
			label: 'Slug',
			type: FieldType.Text,
			options: undefined
		}
	}
}

export default cliSkillDefinition
