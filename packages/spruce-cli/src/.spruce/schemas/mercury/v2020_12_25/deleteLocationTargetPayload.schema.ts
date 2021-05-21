import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const deleteLocationTargetPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.DeleteLocationTargetPayloadSchema  = {
	id: 'deleteLocationTargetPayload',
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

SchemaRegistry.getInstance().trackSchema(deleteLocationTargetPayloadSchema)

export default deleteLocationTargetPayloadSchema
