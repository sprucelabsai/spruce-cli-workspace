import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import organizationSchema from '#spruce/schemas/spruce/v2020_07_22/organization.schema'

const createOrgResponsePayloadSchema: SpruceSchemas.Mercury.v2020_12_25.CreateOrgResponsePayloadSchema  = {
	id: 'createOrgResponsePayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'organization': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: organizationSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(createOrgResponsePayloadSchema)

export default createOrgResponsePayloadSchema
