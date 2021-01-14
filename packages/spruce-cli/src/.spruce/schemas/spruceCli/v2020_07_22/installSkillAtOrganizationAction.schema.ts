import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const installSkillAtOrganizationActionSchema: SpruceSchemas.SpruceCli.v2020_07_22.InstallSkillAtOrganizationActionSchema  = {
	id: 'installSkillAtOrganizationAction',
	version: 'v2020_07_22',
	namespace: 'SpruceCli',
	name: 'install skill at organization action',
	    fields: {
	            /** Organization id. */
	            'organizationId': {
	                label: 'Organization id',
	                type: 'id',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(installSkillAtOrganizationActionSchema)

export default installSkillAtOrganizationActionSchema
