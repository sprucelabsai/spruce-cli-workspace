import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import hirePersonEmitTargetSchema from '#spruce/schemas/mercury/v2020_12_25/hirePersonEmitTarget.schema'
import hirePersonEmitPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/hirePersonEmitPayload.schema'

const hirePersonEmitTargetAndPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.HirePersonEmitTargetAndPayloadSchema  = {
	id: 'hirePersonEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'target': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: hirePersonEmitTargetSchema,}
	            },
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: hirePersonEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(hirePersonEmitTargetAndPayloadSchema)

export default hirePersonEmitTargetAndPayloadSchema
