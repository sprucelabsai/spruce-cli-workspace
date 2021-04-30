import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const unregisterListenersResponsePayloadSchema: SpruceSchemas.Mercury.v2020_12_25.UnregisterListenersResponsePayloadSchema  = {
	id: 'unregisterListenersResponsePayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'unregisterCount': {
	                type: 'number',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(unregisterListenersResponsePayloadSchema)

export default unregisterListenersResponsePayloadSchema
