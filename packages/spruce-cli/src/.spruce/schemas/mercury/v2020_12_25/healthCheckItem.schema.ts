import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const healthCheckItemSchema: SpruceSchemas.Mercury.v2020_12_25.HealthCheckItemSchema  = {
	id: 'healthCheckItem',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'status': {
	                type: 'select',
	                options: {choices: [{"value":"passed","label":"Passed"}],}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(healthCheckItemSchema)

export default healthCheckItemSchema
