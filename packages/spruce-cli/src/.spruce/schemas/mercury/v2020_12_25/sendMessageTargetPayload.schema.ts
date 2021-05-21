import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const sendMessageTargetPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.SendMessageTargetPayloadSchema  = {
	id: 'sendMessageTargetPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'personId': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(sendMessageTargetPayloadSchema)

export default sendMessageTargetPayloadSchema
