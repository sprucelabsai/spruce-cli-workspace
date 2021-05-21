import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const updateOrgEmitPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.UpdateOrgEmitPayloadSchema  = {
	id: 'updateOrgEmitPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** Name. */
	            'name': {
	                label: 'Name',
	                type: 'text',
	                options: undefined
	            },
	            /** . */
	            'dateCreated': {
	                type: 'number',
	                options: undefined
	            },
	            /** . */
	            'dateDeleted': {
	                type: 'number',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(updateOrgEmitPayloadSchema)

export default updateOrgEmitPayloadSchema
