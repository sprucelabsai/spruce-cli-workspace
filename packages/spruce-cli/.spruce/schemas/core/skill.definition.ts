import * as SpruceSchema from '@sprucelabs/schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'

const skillDefinition: SpruceSchemas.Core.Skill.IDefinition = {
	id: 'skill',
	name: 'Skill',
	description: 'An ability Sprucebot has learned.',
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
		/** Description. */
		description: {
			label: 'Description',
			type: SpruceSchema.FieldType.Text,
			options: undefined
		},
		/** Slug. */
		slug: {
			label: 'Slug',
			type: SpruceSchema.FieldType.Text,
			options: undefined
		},
		/** Icon. */
		icon: {
			label: 'Icon',
			type: SpruceSchema.FieldType.Text,
			options: undefined
		}
	}
}

export default skillDefinition
