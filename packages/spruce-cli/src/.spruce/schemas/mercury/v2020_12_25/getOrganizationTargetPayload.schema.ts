import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const getOrganizationTargetPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.GetOrganizationTargetPayloadSchema  = {
	id: 'getOrganizationTargetPayload',
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

SchemaRegistry.getInstance().trackSchema(getOrganizationTargetPayloadSchema)

export default getOrganizationTargetPayloadSchema
