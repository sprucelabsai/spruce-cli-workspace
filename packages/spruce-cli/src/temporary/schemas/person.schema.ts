import { ISchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import { CORE_SCHEMA_VERSION } from '../../constants'

const profileImageSchema: ISchema = {
	id: 'profileImage',
	name: 'Profile Image Sizes',
	description: 'Various sizes that a profile image comes in.',
	version: CORE_SCHEMA_VERSION.dirValue,
	fields: {
		profile60: {
			label: '60x60',
			type: FieldType.Text,
			isRequired: true,
		},
		profile150: {
			label: '150x150',
			type: FieldType.Text,
			isRequired: true,
		},
		'profile60@2x': {
			label: '60x60',
			type: FieldType.Text,
			isRequired: true,
		},
		'profile150@2x': {
			label: '150x150',
			type: FieldType.Text,
			isRequired: true,
		},
	},
}

const personSchema: ISchema = {
	id: 'person',
	name: 'Person',
	description: 'A human being.',
	version: CORE_SCHEMA_VERSION.dirValue,
	fields: {
		id: {
			label: 'Id',
			type: FieldType.Id,
			isRequired: true,
		},
		firstName: {
			label: 'First name',
			type: FieldType.Text,
			isPrivate: true,
		},
		lastName: {
			label: 'Last name',
			type: FieldType.Text,
			isPrivate: true,
		},
		casualName: {
			label: 'Casual name',
			type: FieldType.Text,
			hint: 'The name you can use when talking to this person.',
			isRequired: true,
		},
		formalName: {
			label: 'Casual name',
			type: FieldType.Text,
			hint: 'The name you can use when talking to this person.',
			isRequired: true,
		},
		phoneNumber: {
			label: 'Phone',
			type: FieldType.Phone,
			hint: 'A number that can be texted',
			isPrivate: true,
		},
		profileImages: {
			label: 'Profile photos',
			type: FieldType.Schema,
			options: {
				schema: profileImageSchema,
			},
		},
		defaultProfileImages: {
			label: 'Default profile photos',
			type: FieldType.Schema,
			isRequired: true,
			options: {
				schema: profileImageSchema,
			},
		},
	},
}

export default personSchema
