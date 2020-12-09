import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import updateOrgSchema from '#spruce/schemas/mercuryApi/updateOrg.schema'

const updateOrgResponsePayloadSchema: SpruceSchemas.MercuryApi.UpdateOrgResponsePayloadSchema  = {
	id: 'updateOrgResponsePayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'organization': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: updateOrgSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(updateOrgResponsePayloadSchema)

export default updateOrgResponsePayloadSchema
