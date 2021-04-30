import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const unregisterListenersEmitPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.UnregisterListenersEmitPayloadSchema  = {
	id: 'unregisterListenersEmitPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'fullyQualifiedEventNames': {
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

SchemaRegistry.getInstance().trackSchema(unregisterListenersEmitPayloadSchema)

export default unregisterListenersEmitPayloadSchema
