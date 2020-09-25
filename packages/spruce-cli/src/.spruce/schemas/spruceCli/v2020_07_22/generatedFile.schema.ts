import { SpruceSchemas } from '../../schemas.types'





const generatedFileSchema: SpruceSchemas.SpruceCli.v2020_07_22.IGeneratedFileSchema  = {
	id: 'generatedFile',
	name: 'Generated File',
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

export default generatedFileSchema
