import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const setupVscodeActionSchema: SpruceSchemas.SpruceCli.v2020_07_22.SetupVscodeActionSchema  = {
	id: 'setupVscodeAction',
	version: 'v2020_07_22',
	namespace: 'SpruceCli',
	name: 'Setup vscode action',
	description: 'Install vscode extensions the Spruce team recommends!',
	    fields: {
	            /** Install everything. */
	            'all': {
	                label: 'Install everything',
	                type: 'boolean',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(setupVscodeActionSchema)

export default setupVscodeActionSchema
