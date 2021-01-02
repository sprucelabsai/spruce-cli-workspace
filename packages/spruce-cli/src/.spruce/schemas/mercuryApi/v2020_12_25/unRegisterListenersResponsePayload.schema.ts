import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const unRegisterListenersResponsePayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.UnRegisterListenersResponsePayloadSchema  = {
	id: 'unRegisterListenersResponsePayload',
	version: 'v2020_12_25',
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
