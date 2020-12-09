import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import organizationSchema from '#spruce/schemas/spruce/v2020_07_22/organization.schema'

const getOrgResponsePayloadSchema: SpruceSchemas.MercuryApi.GetOrgResponsePayloadSchema  = {
	id: 'getOrgResponsePayload',
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

SchemaRegistry.getInstance().trackSchema(getOrgResponsePayloadSchema)

export default getOrgResponsePayloadSchema
