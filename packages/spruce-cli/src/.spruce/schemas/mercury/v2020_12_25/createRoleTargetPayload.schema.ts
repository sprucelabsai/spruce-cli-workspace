import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const createRoleTargetPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.CreateRoleTargetPayloadSchema  = {
	id: 'createRoleTargetPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'organizationId': {
	                type: 'id',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(createRoleTargetPayloadSchema)

export default createRoleTargetPayloadSchema
