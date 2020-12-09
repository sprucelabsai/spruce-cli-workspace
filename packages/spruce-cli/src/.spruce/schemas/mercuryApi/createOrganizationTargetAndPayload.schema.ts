import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import createOrgEmitPayloadSchema from '#spruce/schemas/mercuryApi/createOrgEmitPayload.schema'

const createOrganizationTargetAndPayloadSchema: SpruceSchemas.MercuryApi.CreateOrganizationTargetAndPayloadSchema  = {
	id: 'createOrganizationTargetAndPayload',
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
