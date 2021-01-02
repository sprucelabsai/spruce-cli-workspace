import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import listRolesEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/listRolesEmitPayload.schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/v2020_12_25/eventTarget.schema'

const listRolesTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.ListRolesTargetAndPayloadSchema  = {
	id: 'listRolesTargetAndPayload',
	version: 'v2020_12_25',
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
