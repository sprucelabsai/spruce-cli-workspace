import { SpruceErrors } from '../errors.types'




const fileExistsSchema: SpruceErrors.SpruceCli.IFileExistsSchema  = {
	id: 'fileExists',
	name: 'fileExists',
	description: 'The file already exists',
	    fields: {
	            /** File. The file being created */
	            'file': {
	                label: 'File',
	                type: 'text',
	                isRequired: true,
	                hint: 'The file being created',
	                options: undefined
	            },
	    }
}

export default fileExistsSchema
