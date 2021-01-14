import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const deleteLocationEmitPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.DeleteLocationEmitPayloadSchema  = {
	id: 'deleteLocationEmitPayload',
	version: 'v2020_12_25',
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

SchemaRegistry.getInstance().trackSchema(deleteLocationEmitPayloadSchema)

export default deleteLocationEmitPayloadSchema
