import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import listRolesEmitPayloadSchema from '#spruce/schemas/mercuryApi/listRolesEmitPayload.schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/eventTarget.schema'

const listRolesTargetAndPayloadSchema: SpruceSchemas.MercuryApi.ListRolesTargetAndPayloadSchema  = {
	id: 'listRolesTargetAndPayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: listRolesEmitPayloadSchema,}
	            },
	            /** . */
	            'target': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: eventTargetSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(listRolesTargetAndPayloadSchema)

export default listRolesTargetAndPayloadSchema
