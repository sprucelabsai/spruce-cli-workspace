import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const listLocationsTargetPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.ListLocationsTargetPayloadSchema  = {
	id: 'listLocationsTargetPayload',
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

SchemaRegistry.getInstance().trackSchema(listLocationsTargetPayloadSchema)

export default listLocationsTargetPayloadSchema
