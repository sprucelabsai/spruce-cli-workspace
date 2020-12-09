import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'



const canListenEmitPayloadSchema: SpruceSchemas.MercuryApi.CanListenEmitPayloadSchema  = {
	id: 'canListenEmitPayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'authorizerStatuses': {
	                type: 'select',
	                options: {choices: [{"label":"Clocked in","value":"clockedIn"},{"label":"Clocked out","value":"clockedOut"},{"label":"On premise","value":"onPrem"},{"label":"Off premise","value":"offPrem"}],}
	            },
	            /** . */
	            'eventNameWithOptionalNamespace': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(canListenEmitPayloadSchema)

export default canListenEmitPayloadSchema
