import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const createLocationTargetPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.CreateLocationTargetPayloadSchema  = {
	id: 'createLocationTargetPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'organizationId': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(createLocationTargetPayloadSchema)

export default createLocationTargetPayloadSchema
