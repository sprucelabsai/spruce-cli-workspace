import { ISchema, ISelectFieldDefinitionChoice } from '@sprucelabs/schema'
import { CORE_SCHEMA_VERSION } from '@sprucelabs/spruce-skill-utils'

const roleDefinition: ISchema = {
	id: 'role',
	name: 'Role',
	description:
		'Everyone in Spruce breaks into 5 roles. Owner, District/Regional Manager, Manager, Teammate, and Guest.',
	version: CORE_SCHEMA_VERSION.constValue,
	fields: {
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

export enum RoleSlugs {
	Owner = 'owner',
	Manager = 'manager',
	Teammate = 'teammate',
	Guest = 'guest',
}

export const roleSelectChoices: ISelectFieldDefinitionChoice[] = [
	{
		value: 'owner',
		label: 'Owner',
	},
	{
		value: 'groupManager',
		label: 'District/region manager',
	},
	{
		value: 'manager',
		label: 'Manager',
	},
	{
		value: 'teammate',
		label: 'Teammate',
	},
	{
		value: 'guest',
		label: 'Guest',
	},
]
