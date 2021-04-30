import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const updateOrgSchema: SpruceSchemas.Mercury.v2020_12_25.UpdateOrgSchema  = {
	id: 'updateOrg',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** Name. */
	            'name': {
	                label: 'Name',
	                type: 'text',
	                options: undefined
	            },
	            /** Slug. */
	            'slug': {
	                label: 'Slug',
	                type: 'text',
	                options: undefined
	            },
	            /** . */
	            'dateCreated': {
	                type: 'number',
	                options: undefined
	            },
	            /** . */
	            'dateDeleted': {
	                type: 'number',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(updateOrgSchema)

export default updateOrgSchema
