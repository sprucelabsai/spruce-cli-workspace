import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'



const getOrganizationEmitPayloadSchema: SpruceSchemas.MercuryApi.GetOrganizationEmitPayloadSchema  = {
	id: 'getOrganizationEmitPayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'id': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(getOrganizationEmitPayloadSchema)

export default getOrganizationEmitPayloadSchema
