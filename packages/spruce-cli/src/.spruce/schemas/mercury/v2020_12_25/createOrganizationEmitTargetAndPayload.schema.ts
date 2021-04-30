import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import createOrgEmitPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/createOrgEmitPayload.schema'

const createOrganizationEmitTargetAndPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.CreateOrganizationEmitTargetAndPayloadSchema  = {
	id: 'createOrganizationEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: createOrgEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(createOrganizationEmitTargetAndPayloadSchema)

export default createOrganizationEmitTargetAndPayloadSchema
