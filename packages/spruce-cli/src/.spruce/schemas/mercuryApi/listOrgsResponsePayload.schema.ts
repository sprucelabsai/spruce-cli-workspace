import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import organizationSchema from '#spruce/schemas/spruce/v2020_07_22/organization.schema'

const listOrgsResponsePayloadSchema: SpruceSchemas.MercuryApi.ListOrgsResponsePayloadSchema  = {
	id: 'listOrgsResponsePayload',
	namespace: 'MercuryApi',
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
