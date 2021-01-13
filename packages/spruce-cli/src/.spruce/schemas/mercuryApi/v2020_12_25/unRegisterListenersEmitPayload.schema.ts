import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const unregisterListenersEmitPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.UnregisterListenersEmitPayloadSchema  = {
	id: 'unregisterListenersEmitPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'fullyQualifiedEventNames': {
	                type: 'text',
	                isArray: true,
	                options: undefined
	            },
	            /** . */
	            'shouldUnRegisterAll': {
	                type: 'boolean',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(unregisterListenersEmitPayloadSchema)

export default unregisterListenersEmitPayloadSchema
