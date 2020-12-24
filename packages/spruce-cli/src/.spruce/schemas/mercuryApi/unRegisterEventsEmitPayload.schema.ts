import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'



const unRegisterEventsEmitPayloadSchema: SpruceSchemas.MercuryApi.UnRegisterEventsEmitPayloadSchema  = {
	id: 'unRegisterEventsEmitPayload',
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
	            'shouldUnRegisterAll': {
	                type: 'boolean',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(unRegisterEventsEmitPayloadSchema)

export default unRegisterEventsEmitPayloadSchema
