import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'



const healthCheckItemSchema: SpruceSchemas.MercuryApi.HealthCheckItemSchema  = {
	id: 'healthCheckItem',
	namespace: 'MercuryApi',
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
