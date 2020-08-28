import { ISchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import { CORE_SCHEMA_VERSION } from '../../constants'
import personSchema from './person.schema'

const skillSchema: ISchema = {
	id: 'skill',
	name: 'Skill',
	version: CORE_SCHEMA_VERSION.dirValue,
	description: 'An ability Sprucebot has learned.',
	fields: {
		id: {
			label: 'Id',
			type: FieldType.Id,
			isRequired: true,
		},
		apiKey: {
			label: 'Id',
			isPrivate: true,
			type: FieldType.Id,
			isRequired: true,
		},
		name: {
			label: 'Name',
			type: FieldType.Text,
			isRequired: true,
		},
		description: {
			label: 'Description',
			type: FieldType.Text,
			isRequired: false,
		},
		slug: {
			label: 'Slug',
			type: FieldType.Text,
			isRequired: true,
		},
		icon: {
			label: 'Icon',
			type: FieldType.Text,
			isRequired: false,
		},
		creators: {
			label: 'Creators',
			type: FieldType.Schema,
			hint: 'The people who created and own this skill.',
			isRequired: true,
			isArray: true,
			isPrivate: true,
			options: {
				schema: personSchema,
			},
		},
	},
}

export default skillSchema
