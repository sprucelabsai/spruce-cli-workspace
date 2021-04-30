import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import eventContractSchema from '#spruce/schemas/mercury/v2020_09_01/eventContract.schema'

const registerEventsEmitPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.RegisterEventsEmitPayloadSchema  = {
	id: 'registerEventsEmitPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'contract': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: eventContractSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(registerEventsEmitPayloadSchema)

export default registerEventsEmitPayloadSchema
