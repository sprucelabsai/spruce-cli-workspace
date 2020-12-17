import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import listOrgsEmitPayloadSchema from '#spruce/schemas/mercuryApi/listOrgsEmitPayload.schema'

const listOrganizationsTargetAndPayloadSchema: SpruceSchemas.MercuryApi.ListOrganizationsTargetAndPayloadSchema  = {
	id: 'listOrganizationsTargetAndPayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: listOrgsEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(listOrganizationsTargetAndPayloadSchema)

export default listOrganizationsTargetAndPayloadSchema
