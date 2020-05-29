import * as SpruceSchema from '@sprucelabs/schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'

const cliSkillDefinition: SpruceSchemas.Local.CliSkill.IDefinition = {
	id: 'cliSkill',
	name: 'Skill',
	description: 'A stripped down skill for the cli',
	fields: {
		/** Id. */
		id: {
			label: 'Id',
			type: SpruceSchema.FieldType.Id,
			isRequired: true,
			options: undefined
		},
		/** Id. */
		apiKey: {
			label: 'Id',
			type: SpruceSchema.FieldType.Id,
			isRequired: true,
			options: undefined
		},
		/** Name. */
		name: {
			label: 'Name',
			type: SpruceSchema.FieldType.Text,
			isRequired: true,
			options: undefined
		},
		/** Slug. */
		slug: {
			label: 'Slug',
			type: SpruceSchema.FieldType.Text,
			options: undefined
		}
	}
}

export default cliSkillDefinition
