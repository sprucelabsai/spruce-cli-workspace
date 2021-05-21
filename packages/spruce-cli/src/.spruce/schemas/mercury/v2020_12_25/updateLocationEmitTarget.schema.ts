import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const updateLocationEmitTargetSchema: SpruceSchemas.Mercury.v2020_12_25.UpdateLocationEmitTargetSchema  = {
	id: 'updateLocationEmitTarget',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'locationId': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(updateLocationEmitTargetSchema)

export default updateLocationEmitTargetSchema
