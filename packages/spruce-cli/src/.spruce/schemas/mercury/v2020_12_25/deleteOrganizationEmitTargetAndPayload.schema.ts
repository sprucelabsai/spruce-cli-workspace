import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import deleteOrganizationTargetPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/deleteOrganizationTargetPayload.schema'

const deleteOrganizationEmitTargetAndPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.DeleteOrganizationEmitTargetAndPayloadSchema  = {
	id: 'deleteOrganizationEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'target': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: deleteOrganizationTargetPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(deleteOrganizationEmitTargetAndPayloadSchema)

export default deleteOrganizationEmitTargetAndPayloadSchema
