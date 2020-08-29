import { ISchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import { CORE_SCHEMA_VERSION } from '../../constants'
import JobSchema from './job.schema'
import organizationSchema from './organization.schema'
import personSchema from './person.schema'
import { roleSelectChoices } from './role.schema'

const personOrganization: ISchema = {
	id: 'personOrganization',
	name: 'Person <-> organization relationship',
	version: CORE_SCHEMA_VERSION.constValue,
	fields: {
		id: {
			label: 'Id',
			type: FieldType.Id,
		},
		role: {
			label: 'Name',
			type: FieldType.Select,
			isRequired: true,
			options: {
				choices: roleSelectChoices,
			},
		},
		jobs: {
			label: 'Jobs',
			type: FieldType.Schema,
			options: {
				schema: JobSchema,
			},
		},
		organization: {
			label: 'Organization',
			type: FieldType.Schema,
			isRequired: true,
			options: {
				schema: organizationSchema,
			},
		},
		person: {
			label: 'Person',
			type: FieldType.Schema,
			isRequired: true,
			options: {
				schema: personSchema,
			},
		},
	},
}

export default personOrganization
