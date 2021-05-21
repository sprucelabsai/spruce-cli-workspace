import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const getLocationTargetPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.GetLocationTargetPayloadSchema  = {
	id: 'getLocationTargetPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'locationId': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(getLocationTargetPayloadSchema)

export default getLocationTargetPayloadSchema
