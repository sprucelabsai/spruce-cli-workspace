import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'



const listLocationsEmitPayloadSchema: SpruceSchemas.MercuryApi.ListLocationsEmitPayloadSchema  = {
	id: 'listLocationsEmitPayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'includePrivateLocations': {
	                type: 'boolean',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(listLocationsEmitPayloadSchema)

export default listLocationsEmitPayloadSchema
