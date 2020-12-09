import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import eventTargetSchema from '#spruce/schemas/mercuryApi/eventTarget.schema'

const deleteOrganizationTargetAndPayloadSchema: SpruceSchemas.MercuryApi.DeleteOrganizationTargetAndPayloadSchema  = {
	id: 'deleteOrganizationTargetAndPayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'target': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: eventTargetSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(deleteOrganizationTargetAndPayloadSchema)

export default deleteOrganizationTargetAndPayloadSchema
