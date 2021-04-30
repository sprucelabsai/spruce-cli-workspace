import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import eventTargetSchema from '#spruce/schemas/mercury/v2020_12_25/eventTarget.schema'
import didMessageEmitPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/didMessageEmitPayload.schema'

const didMessageEmitTargetAndPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.DidMessageEmitTargetAndPayloadSchema  = {
	id: 'didMessageEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'target': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: eventTargetSchema,}
	            },
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: didMessageEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(didMessageEmitTargetAndPayloadSchema)

export default didMessageEmitTargetAndPayloadSchema
