import { ISchemaDefinition } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import { CORE_SCHEMA_VERSION } from '../../constants'
import jobDefinition from './job.definition'
import locationDefinition from './location.definition'
import personDefinition from './person.definition'
import { roleSelectChoices } from './role.definition'

const personLocationDefinition: ISchemaDefinition = {
	id: 'personLocation',
	name: 'Person <-> location relationship',
	version: CORE_SCHEMA_VERSION.constVal,
	fields: {
		id: {
			label: 'Id',
			type: FieldType.Id,
		},
		roles: {
			label: 'Name',
			type: FieldType.Select,
			isRequired: true,
			isArray: true,
			options: {
				choices: roleSelectChoices,
			},
		},
		status: {
			label: 'Status',
			type: FieldType.Text,
		},
		visits: {
			label: 'Total visits',
			type: FieldType.Number,
			isRequired: true,
			options: {
				choices: roleSelectChoices,
			},
		},
		lastRecordedVisit: {
			label: 'Last visit',
			type: FieldType.DateTime,
		},
		job: {
			label: 'Job',
			type: FieldType.Schema,
			isRequired: true,
			options: {
				schema: jobDefinition,
			},
		},
		location: {
			label: 'Location',
			type: FieldType.Schema,
			isRequired: true,
			options: {
				schema: locationDefinition,
			},
		},
		person: {
			label: 'Person',
			type: FieldType.Schema,
			isRequired: true,
			options: {
				schema: personDefinition,
			},
		},
	},
}

export default personLocationDefinition
