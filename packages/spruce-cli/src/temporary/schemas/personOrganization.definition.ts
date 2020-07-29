import { ISchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import { CORE_SCHEMA_VERSION } from '../../constants'
import JobSchema from './job.definition'
import organizationSchema from './organization.definition'
import personSchema from './person.definition'
import { roleSelectChoices } from './role.definition'

const personOrganization: ISchema = {
	id: 'personOrganization',
	name: 'Person <-> organization relationship',
	version: CORE_SCHEMA_VERSION.dirValue,
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
