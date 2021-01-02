import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import eventTargetSchema from '#spruce/schemas/mercuryApi/v2020_12_25/eventTarget.schema'

const deleteOrganizationTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.DeleteOrganizationTargetAndPayloadSchema  = {
	id: 'deleteOrganizationTargetAndPayload',
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
	    }
}

SchemaRegistry.getInstance().trackSchema(deleteOrganizationTargetAndPayloadSchema)

export default deleteOrganizationTargetAndPayloadSchema
