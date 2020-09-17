import { SpruceSchemas } from '../../schemas.types'




const setupVscodeActionSchema: SpruceSchemas.SpruceCli.v2020_07_22.ISetupVscodeActionSchema  = {
	id: 'setupVscodeAction',
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

export default setupVscodeActionSchema
