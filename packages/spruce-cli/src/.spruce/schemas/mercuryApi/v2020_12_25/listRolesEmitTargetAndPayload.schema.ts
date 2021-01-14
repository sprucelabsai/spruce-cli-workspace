import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import eventTargetSchema from '#spruce/schemas/mercuryApi/v2020_12_25/eventTarget.schema'
import listRolesEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/listRolesEmitPayload.schema'

const listRolesEmitTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.ListRolesEmitTargetAndPayloadSchema  = {
	id: 'listRolesEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
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
	                options: {schema: listRolesEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(listRolesEmitTargetAndPayloadSchema)

export default listRolesEmitTargetAndPayloadSchema
