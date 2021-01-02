import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const unRegisterEventsEmitPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.UnRegisterEventsEmitPayloadSchema  = {
	id: 'unRegisterEventsEmitPayload',
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
	            'shouldUnRegisterAll': {
	                type: 'boolean',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(unRegisterEventsEmitPayloadSchema)

export default unRegisterEventsEmitPayloadSchema
