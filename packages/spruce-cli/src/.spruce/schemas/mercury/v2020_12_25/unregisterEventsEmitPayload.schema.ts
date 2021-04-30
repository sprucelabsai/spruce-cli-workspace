import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const unregisterEventsEmitPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.UnregisterEventsEmitPayloadSchema  = {
	id: 'unregisterEventsEmitPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
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
