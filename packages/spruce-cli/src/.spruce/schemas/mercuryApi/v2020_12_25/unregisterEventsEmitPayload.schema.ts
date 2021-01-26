import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const unregisterEventsEmitPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.UnregisterEventsEmitPayloadSchema  = {
	id: 'unregisterEventsEmitPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'eventNames': {
	                type: 'text',
	                isArray: true,
	                options: undefined
	            },
	            /** . */
	            'shouldUnregisterAll': {
	                type: 'boolean',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(unregisterEventsEmitPayloadSchema)

export default unregisterEventsEmitPayloadSchema
