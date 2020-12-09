import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import eventTargetSchema from '#spruce/schemas/mercuryApi/eventTarget.schema'

const getOrganizationTargetAndPayloadSchema: SpruceSchemas.MercuryApi.GetOrganizationTargetAndPayloadSchema  = {
	id: 'getOrganizationTargetAndPayload',
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

SchemaRegistry.getInstance().trackSchema(getOrganizationTargetAndPayloadSchema)

export default getOrganizationTargetAndPayloadSchema
