import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const deleteOrganizationTargetPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.DeleteOrganizationTargetPayloadSchema  = {
	id: 'deleteOrganizationTargetPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'organizationId': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(deleteOrganizationTargetPayloadSchema)

export default deleteOrganizationTargetPayloadSchema
