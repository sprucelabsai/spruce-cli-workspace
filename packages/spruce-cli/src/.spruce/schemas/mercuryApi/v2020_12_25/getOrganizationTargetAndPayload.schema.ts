import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import getOrganizationEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/getOrganizationEmitPayload.schema'

const getOrganizationTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.GetOrganizationTargetAndPayloadSchema  = {
	id: 'getOrganizationTargetAndPayload',
	version: 'v2020_12_25',
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
