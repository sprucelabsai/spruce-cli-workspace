import { ISchema } from '@sprucelabs/schema'
import { CORE_SCHEMA_VERSION } from '@sprucelabs/spruce-skill-utils'

const profileImageSchema: ISchema = {
	id: 'profileImage',
	name: 'Profile Image Sizes',
	description: 'Various sizes that a profile image comes in.',
	version: CORE_SCHEMA_VERSION.constValue,
	fields: {
		profile60: {
			label: '60x60',
			type: 'text',
			isRequired: true,
		},
		profile150: {
			label: '150x150',
			type: 'text',
			isRequired: true,
		},
		'profile60@2x': {
			label: '60x60',
			type: 'text',
			isRequired: true,
		},
		'profile150@2x': {
			label: '150x150',
			type: 'text',
			isRequired: true,
		},
	},
}

const personSchema: ISchema = {
	id: 'person',
	name: 'Person',
	description: 'A human being.',
	version: CORE_SCHEMA_VERSION.constValue,
	fields: {
		id: {
			label: 'Id',
			type: 'id',
			isRequired: true,
		},
		firstName: {
			label: 'First name',
			type: 'text',
			isPrivate: true,
		},
		lastName: {
			label: 'Last name',
			type: 'text',
			isPrivate: true,
		},
		casualName: {
			label: 'Casual name',
			type: 'text',
			hint: 'The name you can use when talking to this person.',
			isRequired: true,
		},
		phone: {
			label: 'Phone',
			type: 'phone',
			hint: 'A number that can be texted',
			isPrivate: true,
		},
		profileImages: {
			label: 'Profile photos',
			type: 'schema',
			options: {
				schema: profileImageSchema,
			},
		},
		dateCreated: {
			type: 'number',
			isRequired: true,
		},
		dateScrambled: {
			type: 'number',
		},
	},
}

export default personSchema
