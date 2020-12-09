import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'



const unRegisterListenersResponsePayloadSchema: SpruceSchemas.MercuryApi.UnRegisterListenersResponsePayloadSchema  = {
	id: 'unRegisterListenersResponsePayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'unRegisterCount': {
	                type: 'number',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(unRegisterListenersResponsePayloadSchema)

export default unRegisterListenersResponsePayloadSchema
