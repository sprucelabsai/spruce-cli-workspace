import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const organizationSchema: SpruceSchemas.Spruce.v2020_07_22.IOrganizationSchema  = {
	id: 'organization',
	version: 'v2020_07_22',
	namespace: 'Spruce',
	name: 'Organization',
	description: 'A company or team. Comprises of many people and locations.',
	    fields: {
	            /** Id. */
	            'id': {
	                label: 'Id',
	                type: 'id',
	                options: undefined
	            },
	            /** Name. */
	            'name': {
	                label: 'Name',
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	            /** Slug. */
	            'slug': {
	                label: 'Slug',
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(organizationSchema)

export default organizationSchema
