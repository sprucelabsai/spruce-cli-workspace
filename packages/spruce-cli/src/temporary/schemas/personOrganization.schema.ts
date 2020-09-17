import { ISchema } from '@sprucelabs/schema'
import { CORE_SCHEMA_VERSION } from '@sprucelabs/spruce-skill-utils'
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
			type: 'id',
		},
		role: {
			label: 'Name',
			type: 'select',
			isRequired: true,
			options: {
				choices: roleSelectChoices,
			},
		},
		jobs: {
			label: 'Jobs',
			type: 'schema',
			options: {
				schema: JobSchema,
			},
		},
		organization: {
			label: 'Organization',
			type: 'schema',
			isRequired: true,
			options: {
				schema: organizationSchema,
			},
		},
		person: {
			label: 'Person',
			type: 'schema',
			isRequired: true,
			options: {
				schema: personSchema,
			},
		},
	},
}

export default personOrganization
