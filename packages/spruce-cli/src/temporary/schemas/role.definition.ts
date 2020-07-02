import {
	ISchemaDefinition,
	ISelectFieldDefinitionChoice
} from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import { CORE_SCHEMA_VERSION } from '../../constants'

const roleDefinition: ISchemaDefinition = {
	id: 'role',
	name: 'Role',
	version: CORE_SCHEMA_VERSION.constVal,
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

export const RoleSelectChoices: ISelectFieldDefinitionChoice[] = [
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
