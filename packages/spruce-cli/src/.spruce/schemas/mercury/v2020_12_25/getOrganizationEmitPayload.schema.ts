import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const getOrganizationEmitPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.GetOrganizationEmitPayloadSchema  = {
	id: 'getOrganizationEmitPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'id': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(getOrganizationEmitPayloadSchema)

export default getOrganizationEmitPayloadSchema
