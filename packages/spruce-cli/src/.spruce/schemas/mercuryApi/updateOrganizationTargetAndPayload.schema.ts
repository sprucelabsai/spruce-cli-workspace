import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import updateOrgWithoutSlugSchemaSchema from '#spruce/schemas/mercuryApi/updateOrgWithoutSlugSchema.schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/eventTarget.schema'

const updateOrganizationTargetAndPayloadSchema: SpruceSchemas.MercuryApi.UpdateOrganizationTargetAndPayloadSchema  = {
	id: 'updateOrganizationTargetAndPayload',
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
