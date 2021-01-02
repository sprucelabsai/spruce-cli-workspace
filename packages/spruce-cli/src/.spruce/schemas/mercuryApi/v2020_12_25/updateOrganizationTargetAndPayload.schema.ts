import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import updateOrgWithoutSlugSchemaSchema from '#spruce/schemas/mercuryApi/v2020_12_25/updateOrgWithoutSlugSchema.schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/v2020_12_25/eventTarget.schema'

const updateOrganizationTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.UpdateOrganizationTargetAndPayloadSchema  = {
	id: 'updateOrganizationTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: updateOrgWithoutSlugSchemaSchema,}
	            },
	            /** . */
	            'target': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: eventTargetSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(updateOrganizationTargetAndPayloadSchema)

export default updateOrganizationTargetAndPayloadSchema
