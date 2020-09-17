import { SpruceErrors } from '../errors.types'




const directoryEmptySchema: SpruceErrors.SpruceCli.IDirectoryEmptySchema  = {
	id: 'directoryEmpty',
	name: 'directory empty',
	    fields: {
	            /** . */
	            'directory': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

export default directoryEmptySchema
