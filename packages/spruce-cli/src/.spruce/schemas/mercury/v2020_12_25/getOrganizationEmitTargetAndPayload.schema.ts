import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import getOrganizationEmitPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/getOrganizationEmitPayload.schema'

const getOrganizationEmitTargetAndPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.GetOrganizationEmitTargetAndPayloadSchema  = {
	id: 'getOrganizationEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
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

SchemaRegistry.getInstance().trackSchema(getOrganizationEmitTargetAndPayloadSchema)

export default getOrganizationEmitTargetAndPayloadSchema
