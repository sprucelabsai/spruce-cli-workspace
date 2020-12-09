import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'



const getLocationEmitPayloadSchema: SpruceSchemas.MercuryApi.GetLocationEmitPayloadSchema  = {
	id: 'getLocationEmitPayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'id': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(getLocationEmitPayloadSchema)

export default getLocationEmitPayloadSchema
