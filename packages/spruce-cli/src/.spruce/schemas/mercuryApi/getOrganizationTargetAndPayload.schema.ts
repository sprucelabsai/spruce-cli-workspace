import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import getOrganizationEmitPayloadSchema from '#spruce/schemas/mercuryApi/getOrganizationEmitPayload.schema'

const getOrganizationTargetAndPayloadSchema: SpruceSchemas.MercuryApi.GetOrganizationTargetAndPayloadSchema  = {
	id: 'getOrganizationTargetAndPayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: getOrganizationEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(getOrganizationTargetAndPayloadSchema)

export default getOrganizationTargetAndPayloadSchema
