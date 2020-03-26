import { ISchemaDefinition, FieldType } from '@sprucelabs/schema'

const skillDefinition: ISchemaDefinition = {
	id: 'skill',
	name: 'Skill',
	description: 'An ability Sprucebot has learned.',
	fields: {
		id: {
			label: 'Id',
			type: FieldType.Id
		},
		apiKey: {
			label: 'Id',
			isPrivate: true,
			type: FieldType.Id
		},
		name: {
			label: 'Name',
			type: FieldType.Text,
			isRequired: true
		},
		description: {
			label: 'Description',
			type: FieldType.Text,
			isRequired: false
		},
		slug: {
			label: 'Slug',
			type: FieldType.Text,
			isRequired: false
		},
		icon: {
			label: 'Icon',
			type: FieldType.Text,
			isRequired: false
		}
	}
}

export default skillDefinition
