import { SpruceSchemas } from '../../schemas.types'





const generatedDirSchema: SpruceSchemas.SpruceCli.v2020_07_22.IGeneratedDirSchema  = {
	id: 'generatedDir',
	name: '',
	    fields: {
	            /** . */
	            'name': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'path': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'description': {
	                type: 'text',
	                options: undefined
	            },
	            /** . */
	            'action': {
	                type: 'select',
	                isRequired: true,
	                options: {choices: [{"label":"Skipped","value":"skipped"},{"label":"Generated","value":"generated"},{"label":"Updated","value":"updated"},{"label":"Deleted","value":"deleted"}],}
	            },
	    }
}

export default generatedDirSchema
