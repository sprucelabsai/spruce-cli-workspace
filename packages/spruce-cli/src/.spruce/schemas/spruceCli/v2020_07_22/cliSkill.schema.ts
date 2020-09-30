import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const cliSkillSchema: SpruceSchemas.SpruceCli.v2020_07_22.ICliSkillSchema  = {
	id: 'cliSkill',
	version: 'v2020_07_22',
	namespace: 'SpruceCli',
	name: 'Skill',
	description: 'A stripped down skill for the cli',
	    fields: {
	            /** Id. */
	            'id': {
	                label: 'Id',
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	            /** Id. */
	            'apiKey': {
	                label: 'Id',
	                type: 'id',
	                isPrivate: true,
	                isRequired: true,
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
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(cliSkillSchema)

export default cliSkillSchema
