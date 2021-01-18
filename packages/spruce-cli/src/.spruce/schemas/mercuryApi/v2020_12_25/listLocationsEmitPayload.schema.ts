import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const listLocationsEmitPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.ListLocationsEmitPayloadSchema  = {
	id: 'listLocationsEmitPayload',
	version: 'v2020_12_25',
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
