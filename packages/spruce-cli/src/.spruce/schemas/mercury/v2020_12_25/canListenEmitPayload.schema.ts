import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const canListenEmitPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.CanListenEmitPayloadSchema  = {
	id: 'canListenEmitPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'authorizerStatuses': {
	                type: 'select',
	                options: {choices: [{"label":"Clocked in","value":"clockedIn"},{"label":"Clocked out","value":"clockedOut"},{"label":"On premise","value":"onPrem"},{"label":"Off premise","value":"offPrem"}],}
	            },
	            /** . */
	            'fullyQualifiedEventName': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(canListenEmitPayloadSchema)

export default canListenEmitPayloadSchema
