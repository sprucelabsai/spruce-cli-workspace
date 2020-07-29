import { ISchema, ISelectFieldDefinitionChoice } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import { CORE_SCHEMA_VERSION } from '../../constants'

const roleDefinition: ISchema = {
	id: 'role',
	name: 'Role',
	version: CORE_SCHEMA_VERSION.dirValue,
	fields: {
		slug: {
			label: 'Slug',
			type: FieldType.Text,
			isRequired: true,
		},
		name: {
			label: 'Name',
			type: FieldType.Text,
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
