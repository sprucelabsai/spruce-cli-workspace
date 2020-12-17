import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const createOrganizationActionSchema: SpruceSchemas.SpruceCli.v2020_07_22.CreateOrganizationActionSchema  = {
	id: 'createOrganizationAction',
	version: 'v2020_07_22',
	namespace: 'SpruceCli',
	name: 'create organization action',
	    fields: {
	            /** Name. The name people will read */
	            'nameReadable': {
	                label: 'Name',
	                type: 'text',
	                isRequired: true,
	                hint: 'The name people will read',
	                options: undefined
	            },
	            /** Slug. kebab-case of the name */
	            'nameKebab': {
	                label: 'Slug',
	                type: 'text',
	                hint: 'kebab-case of the name',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(createOrganizationActionSchema)

export default createOrganizationActionSchema
