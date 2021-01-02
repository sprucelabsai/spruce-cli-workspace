import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import listOrgsEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/listOrgsEmitPayload.schema'

const listOrganizationsTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.ListOrganizationsTargetAndPayloadSchema  = {
	id: 'listOrganizationsTargetAndPayload',
	version: 'v2020_12_25',
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
