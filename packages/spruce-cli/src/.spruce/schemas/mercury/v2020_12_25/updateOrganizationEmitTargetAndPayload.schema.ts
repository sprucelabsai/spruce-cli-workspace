import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import eventTargetSchema from '#spruce/schemas/mercury/v2020_12_25/eventTarget.schema'
import updateOrgWithoutSlugSchemaSchema from '#spruce/schemas/mercury/v2020_12_25/updateOrgWithoutSlugSchema.schema'

const updateOrganizationEmitTargetAndPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.UpdateOrganizationEmitTargetAndPayloadSchema  = {
	id: 'updateOrganizationEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'target': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: eventTargetSchema,}
	            },
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: updateOrgWithoutSlugSchemaSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(updateOrganizationEmitTargetAndPayloadSchema)

export default updateOrganizationEmitTargetAndPayloadSchema
