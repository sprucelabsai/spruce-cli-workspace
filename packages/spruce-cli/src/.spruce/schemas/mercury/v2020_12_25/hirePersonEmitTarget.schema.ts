import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const hirePersonEmitTargetSchema: SpruceSchemas.Mercury.v2020_12_25.HirePersonEmitTargetSchema  = {
	id: 'hirePersonEmitTarget',
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

SchemaRegistry.getInstance().trackSchema(hirePersonEmitTargetSchema)

export default hirePersonEmitTargetSchema
