import { SpruceSchemas } from '../../schemas.types'





const autoloaderSchema: SpruceSchemas.SpruceCli.v2020_07_22.IAutoloaderSchema  = {
	id: 'autoloader',
	name: 'Autoloader',
	description: 'A directory that is autoloaded.',
	    fields: {
	            /** Source directory. */
	            'lookupDir': {
	                label: 'Source directory',
	                type: 'directory',
	                isRequired: true,
	                options: undefined
	            },
	            /** Destination. Where the file that does the autoloading is written */
	            'destination': {
	                label: 'Destination',
	                type: 'file',
	                isRequired: true,
	                hint: 'Where the file that does the autoloading is written',
	                options: undefined
	            },
	            /** Pattern. */
	            'pattern': {
	                label: 'Pattern',
	                type: 'text',
	                isRequired: true,
	                defaultValue: "**/!(*.test).ts",
	                options: undefined
	            },
	    }
}

export default autoloaderSchema
