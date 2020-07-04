import { ISchemaDefinition } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import { CORE_SCHEMA_VERSION } from '../../constants'
import jobDefinition from './job.definition'
import organizationDefinition from './organization.definition'
import personDefinition from './person.definition'
import { roleSelectChoices } from './role.definition'

const personOrganization: ISchemaDefinition = {
	id: 'personOrganization',
	name: 'Person <-> organization relationship',
	version: CORE_SCHEMA_VERSION.constVal,
	fields: {
		id: {
			label: 'Id',
			type: FieldType.Id
		},
		role: {
			label: 'Name',
			type: FieldType.Select,
			isRequired: true,
			options: {
				choices: roleSelectChoices
			}
		},
		jobs: {
			label: 'Jobs',
			type: FieldType.Schema,
			options: {
				schema: jobDefinition
			}
		},
		organization: {
			label: 'Organization',
			type: FieldType.Schema,
			isRequired: true,
			options: {
				schema: organizationDefinition
			}
		},
		person: {
			label: 'Person',
			type: FieldType.Schema,
			isRequired: true,
			options: {
				schema: personDefinition
			}
		}
	}
}

export default personOrganization
