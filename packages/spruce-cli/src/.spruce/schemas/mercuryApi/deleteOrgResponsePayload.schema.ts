import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import organizationSchema from '#spruce/schemas/spruce/v2020_07_22/organization.schema'

const deleteOrgResponsePayloadSchema: SpruceSchemas.MercuryApi.DeleteOrgResponsePayloadSchema  = {
	id: 'deleteOrgResponsePayload',
	namespace: 'MercuryApi',
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

SchemaRegistry.getInstance().trackSchema(deleteOrgResponsePayloadSchema)

export default deleteOrgResponsePayloadSchema
