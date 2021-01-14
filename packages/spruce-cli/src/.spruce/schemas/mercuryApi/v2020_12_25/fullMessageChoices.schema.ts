import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const fullMessageChoicesSchema: SpruceSchemas.MercuryApi.v2020_12_25.FullMessageChoicesSchema  = {
	id: 'fullMessageChoices',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'value': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'label': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(fullMessageChoicesSchema)

export default fullMessageChoicesSchema
