import { SpruceSchemas } from '../../schemas.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

import JobSchema from '#spruce/schemas/spruce/v2020_07_22/job.definition'
import LocationSchema from '#spruce/schemas/spruce/v2020_07_22/location.definition'
import personSchema from '#spruce/schemas/spruce/v2020_07_22/person.definition'

const personLocationSchema: SpruceSchemas.Spruce.v2020_07_22.IPersonLocationSchema  = {
	id: 'personLocation',
	name: 'Person <-> location relationship',
	    fields: {
	            /** Id. */
	            'id': {
	                label: 'Id',
	                type: FieldType.Id,
	                options: undefined
	            },
	            /** Name. */
	            'roles': {
	                label: 'Name',
	                type: FieldType.Select,
	                isRequired: true,
	                isArray: true,
	                options: {choices: [{"value":"owner","label":"Owner"},{"value":"groupManager","label":"District/region manager"},{"value":"manager","label":"Manager"},{"value":"teammate","label":"Teammate"},{"value":"guest","label":"Guest"}],}
	            },
	            /** Status. */
	            'status': {
	                label: 'Status',
	                type: FieldType.Text,
	                options: undefined
	            },
	            /** Total visits. */
	            'visits': {
	                label: 'Total visits',
	                type: FieldType.Number,
	                isRequired: true,
	                options: {choices: [{"value":"owner","label":"Owner"},{"value":"groupManager","label":"District/region manager"},{"value":"manager","label":"Manager"},{"value":"teammate","label":"Teammate"},{"value":"guest","label":"Guest"}],}
	            },
	            /** Last visit. */
	            'lastRecordedVisit': {
	                label: 'Last visit',
	                type: FieldType.DateTime,
	                options: undefined
	            },
	            /** Job. */
	            'job': {
	                label: 'Job',
	                type: FieldType.Schema,
	                isRequired: true,
	                options: {schemas: [JobSchema],}
	            },
	            /** Location. */
	            'location': {
	                label: 'Location',
	                type: FieldType.Schema,
	                isRequired: true,
	                options: {schemas: [LocationSchema],}
	            },
	            /** Person. */
	            'person': {
	                label: 'Person',
	                type: FieldType.Schema,
	                isRequired: true,
	                options: {schemas: [personSchema],}
	            },
	    }
}

export default personLocationSchema
