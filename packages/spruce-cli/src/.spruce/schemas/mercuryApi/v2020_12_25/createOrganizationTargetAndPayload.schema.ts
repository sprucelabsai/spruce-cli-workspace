import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import createOrgEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/createOrgEmitPayload.schema'

const createOrganizationTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.CreateOrganizationTargetAndPayloadSchema  = {
	id: 'createOrganizationTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
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

SchemaRegistry.getInstance().trackSchema(createOrganizationTargetAndPayloadSchema)

export default createOrganizationTargetAndPayloadSchema
