import { SpruceSchemas } from '../../schemas.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const setupVscodeActionSchema: SpruceSchemas.SpruceCli.v2020_07_22.ISetupVscodeActionSchema  = {
	id: 'setupVscodeAction',
	name: 'Setup vscode action',
	description: 'Install vscode extensions the Spruce team recommends!',
	    fields: {
	            /** Install everything. */
	            'all': {
	                label: 'Install everything',
	                type: FieldType.Boolean,
	                options: undefined
	            },
	    }
}

export default setupVscodeActionSchema
