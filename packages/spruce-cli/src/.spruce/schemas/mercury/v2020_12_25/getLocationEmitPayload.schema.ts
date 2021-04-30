import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const getLocationEmitPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.GetLocationEmitPayloadSchema  = {
	id: 'getLocationEmitPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
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
