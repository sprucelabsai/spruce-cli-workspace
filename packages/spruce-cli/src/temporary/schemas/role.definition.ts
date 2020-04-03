import {
	ISchemaDefinition,
	FieldType,
	IFieldSelectDefinitionChoice
} from '@sprucelabs/schema'

const roleDefinition: ISchemaDefinition = {
	id: 'role',
	name: 'Role',
	description: 'All people in Spruce fall into 5 roles.',
	fields: {
		slug: {
			label: 'Slug',
			type: FieldType.Text,
			isRequired: true
		},
		name: {
			label: 'Name',
			type: FieldType.Text,
			isRequired: true
		}
	}
}

export default roleDefinition

export enum RoleSlugs {
	Owner = 'owner',
	GroupManager = 'groupManager',
	Manager = 'manager',
	Teammate = 'teammate',
	Guest = 'guest'
}

export const RoleSelectChoices: IFieldSelectDefinitionChoice[] = [
	{
		value: 'owner',
		label: 'Owner'
	},
	{
		value: 'groupManager',
		label: 'District/region manager'
	},
	{
		value: 'manager',
		label: 'Store manager'
	},
	{
		value: 'teammate',
		label: 'Teammate'
	},
	{
		value: 'guest',
		label: 'Guest'
	}
]
