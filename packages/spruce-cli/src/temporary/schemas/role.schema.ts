import { ISchema } from '@sprucelabs/schema'
import { CORE_SCHEMA_VERSION } from '@sprucelabs/spruce-skill-utils'

const roleDefinition: ISchema = {
	id: 'role',
	name: 'Role',
	description:
		'Everyone in Spruce breaks into 5 roles. Owner, District/Regional Manager, Manager, Teammate, and Guest.',
	version: CORE_SCHEMA_VERSION.constValue,
	fields: {
		id: {
			label: 'Id',
			type: 'id',
			isRequired: true,
		},
		slug: {
			label: 'Slug',
			type: 'text',
			isRequired: true,
		},
		name: {
			label: 'Name',
			type: 'text',
			isRequired: true,
		},
	},
}

export default roleDefinition
