import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const registerListenersEmitPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.RegisterListenersEmitPayloadSchema  = {
	id: 'registerListenersEmitPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'fullyQualifiedEventNames': {
	                type: 'text',
	                isRequired: true,
	                isArray: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(registerListenersEmitPayloadSchema)

export default registerListenersEmitPayloadSchema
