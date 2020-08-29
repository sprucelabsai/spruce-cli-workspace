import { ISchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import { CORE_SCHEMA_VERSION } from '../../constants'

const skillSchema: ISchema = {
	id: 'skill',
	name: 'Skill',
	version: CORE_SCHEMA_VERSION.constValue,
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
		creators: {
			label: 'Creators',
			type: FieldType.Schema,
			hint: 'The people or skills who created and own this skill.',
			isRequired: true,
			isArray: true,
			options: {
				schema: {
					id: 'skillCreator',
					name: 'Skill creator',
					version: CORE_SCHEMA_VERSION.constValue,
					fields: {
						skillId: {
							type: FieldType.Text,
						},
						personId: {
							type: FieldType.Text,
						},
					},
				},
			},
		},
	},
}

export default skillSchema
