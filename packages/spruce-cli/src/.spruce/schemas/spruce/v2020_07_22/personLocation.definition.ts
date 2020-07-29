import { SpruceSchemas } from '../../schemas.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

import jobDefinition from '#spruce/schemas/spruce/v2020_07_22/job.definition'
import locationDefinition from '#spruce/schemas/spruce/v2020_07_22/location.definition'
import personDefinition from '#spruce/schemas/spruce/v2020_07_22/person.definition'

const personLocationDefinition: SpruceSchemas.Spruce.PersonLocation.v2020_07_22.IDefinition  = {
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
	                options: {schemas: [jobDefinition],}
	            },
	            /** Location. */
	            'location': {
	                label: 'Location',
	                type: FieldType.Schema,
	                isRequired: true,
	                options: {schemas: [locationDefinition],}
	            },
	            /** Person. */
	            'person': {
	                label: 'Person',
	                type: FieldType.Schema,
	                isRequired: true,
	                options: {schemas: [personDefinition],}
	            },
	    }
}

export default personLocationDefinition
