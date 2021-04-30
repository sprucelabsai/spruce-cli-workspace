import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import organizationSchema from '#spruce/schemas/spruce/v2020_07_22/organization.schema'

const listOrgsResponsePayloadSchema: SpruceSchemas.Mercury.v2020_12_25.ListOrgsResponsePayloadSchema  = {
	id: 'listOrgsResponsePayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'organizations': {
	                type: 'schema',
	                isRequired: true,
	                isArray: true,
	                options: {schema: organizationSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(listOrgsResponsePayloadSchema)

export default listOrgsResponsePayloadSchema
