import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const hirePersonEmitPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.HirePersonEmitPayloadSchema  = {
	id: 'hirePersonEmitPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'personId': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'roleId': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(hirePersonEmitPayloadSchema)

export default hirePersonEmitPayloadSchema
