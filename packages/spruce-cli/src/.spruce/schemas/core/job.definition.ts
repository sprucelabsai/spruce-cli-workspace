import aclDefinitionCore from '#spruce/schemas/core/acl.definition'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'

const jobDefinition: SpruceSchemas.Spruce.Job.IDefinition = {
	id: 'job',
	name: 'Job',
	description:
		'A position at a company. The answer to the question; What is your job?',
	fields: {
		/** Id. */
		id: {
			label: 'Id',
			type: FieldType.Id,
			options: undefined
		},
		/** Is default. Is this job one that comes with every org? Mapped to roles (owner, groupManager, managar, guest). */
		isDefault: {
			label: 'Is default',
			type: FieldType.Text,
			isRequired: true,
			hint:
				'Is this job one that comes with every org? Mapped to roles (owner, groupManager, managar, guest).',
			options: undefined
		},
		/** Name. */
		name: {
			label: 'Name',
			type: FieldType.Text,
			isRequired: true,
			options: undefined
		},
		/** Role. */
		role: {
			label: 'Role',
			type: FieldType.Select,
			isRequired: true,
			options: {
				choices: [
					{ value: 'owner', label: 'Owner' },
					{ value: 'groupManager', label: 'District/region manager' },
					{ value: 'manager', label: 'Store manager' },
					{ value: 'teammate', label: 'Teammate' },
					{ value: 'guest', label: 'Guest' }
				]
			}
		},
		/** On work permissions. */
		inStoreAcls: {
			label: 'On work permissions',
			type: FieldType.Schema,
			options: { schemas: [aclDefinitionCore] }
		},
		/** Off work permissions. */
		acls: {
			label: 'Off work permissions',
			type: FieldType.Schema,
			options: { schemas: [aclDefinitionCore] }
		}
	}
}

export default jobDefinition
