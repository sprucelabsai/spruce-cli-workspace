import { ISchema } from '@sprucelabs/schema'
import { CORE_SCHEMA_VERSION } from '@sprucelabs/spruce-skill-utils'

const skillSchema: ISchema = {
	id: 'skill',
	name: 'Skill',
	version: CORE_SCHEMA_VERSION.constValue,
	description: 'An ability Sprucebot has learned.',
	fields: {
		id: {
			label: 'Id',
			type: 'id',
			isRequired: true,
		},
		apiKey: {
			label: 'Id',
			isPrivate: true,
			type: 'id',
			isRequired: true,
		},
		name: {
			label: 'Name',
			type: 'text',
			isRequired: true,
		},
		description: {
			label: 'Description',
			type: 'text',
			isRequired: false,
		},
		slug: {
			label: 'Slug',
			type: 'text',
			isRequired: true,
		},
		creators: {
			label: 'Creators',
			type: 'schema',
			hint: 'The people or skills who created and own this skill.',
			isRequired: true,
			isArray: true,
			isPrivate: true,
			options: {
				schema: {
					id: 'skillCreator',
					name: 'Skill creator',
					version: CORE_SCHEMA_VERSION.constValue,
					fields: {
						skillId: {
							type: 'text',
						},
						personId: {
							type: 'text',
						},
					},
				},
			},
		},
		dateCreated: {
			type: 'number',
			isRequired: true,
		},
		dateDeleted: {
			type: 'number',
		},
	},
}

export default skillSchema
