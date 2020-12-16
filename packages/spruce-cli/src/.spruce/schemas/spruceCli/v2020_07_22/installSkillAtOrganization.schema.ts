import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const installSkillAtOrganizationSchema: SpruceSchemas.SpruceCli.v2020_07_22.InstallSkillAtOrganizationSchema  = {
	id: 'installSkillAtOrganization',
	version: 'v2020_07_22',
	namespace: 'SpruceCli',
	name: 'install skill at organization',
	    fields: {
	            /** First Field. */
	            'fieldName1': {
	                label: 'First Field',
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	            /** Second Field. A hint */
	            'fieldName2': {
	                label: 'Second Field',
	                type: 'number',
	                isRequired: true,
	                hint: 'A hint',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(installSkillAtOrganizationSchema)

export default installSkillAtOrganizationSchema
