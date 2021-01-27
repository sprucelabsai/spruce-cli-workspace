import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const bootSkillOptionsSchema: SpruceSchemas.SpruceCli.v2020_07_22.BootSkillOptionsSchema  = {
	id: 'bootSkillOptions',
	version: 'v2020_07_22',
	namespace: 'SpruceCli',
	name: 'Boot skill action',
	description: 'The options for skill.boot.',
	    fields: {
	            /** Run local. Will run using ts-node and typescript directly. Longer boot times */
	            'local': {
	                label: 'Run local',
	                type: 'boolean',
	                hint: 'Will run using ts-node and typescript directly. Longer boot times',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(bootSkillOptionsSchema)

export default bootSkillOptionsSchema
