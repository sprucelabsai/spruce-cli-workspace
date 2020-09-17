import { ISchema } from '@sprucelabs/schema'
import { CORE_SCHEMA_VERSION } from '@sprucelabs/spruce-skill-utils'
import JobSchema from './job.schema'
import LocationSchema from './location.schema'
import personSchema from './person.schema'
import { roleSelectChoices } from './role.schema'

const personLocationSchema: ISchema = {
	id: 'personLocation',
	name: 'Person location',
	description: "A person's visit to a location (business or home).",
	version: CORE_SCHEMA_VERSION.constValue,
	fields: {
		id: {
			label: 'Id',
			type: 'id',
		},
		roles: {
			label: 'Name',
			type: 'select',
			isRequired: true,
			isArray: true,
			options: {
				choices: roleSelectChoices,
			},
		},
		status: {
			label: 'Status',
			type: 'text',
		},
		visits: {
			label: 'Total visits',
			type: 'number',
			isRequired: true,
			options: {
				choices: roleSelectChoices,
			},
		},
		lastRecordedVisit: {
			label: 'Last visit',
			type: 'dateTime',
		},
		job: {
			label: 'Job',
			type: 'schema',
			isRequired: true,
			options: {
				schema: JobSchema,
			},
		},
		location: {
			label: 'Location',
			type: 'schema',
			isRequired: true,
			options: {
				schema: LocationSchema,
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

export default personLocationSchema
