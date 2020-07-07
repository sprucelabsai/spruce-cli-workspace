import { ISchemaDefinition } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import { CORE_SCHEMA_VERSION } from '../../constants'

const skillDefinition: ISchemaDefinition = {
	id: 'skill',
	name: 'Skill',
	version: CORE_SCHEMA_VERSION.constVal,
	description: 'An ability Sprucebot has learned.',
	fields: {
		id: {
			label: 'Id',
			type: FieldType.Id,
			isRequired: true
		},
		apiKey: {
			label: 'Id',
			isPrivate: true,
			type: FieldType.Id,
			isRequired: true
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
