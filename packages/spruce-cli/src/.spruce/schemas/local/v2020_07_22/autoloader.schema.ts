import { SpruceSchemas } from '../../schemas.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const autoloaderSchema: SpruceSchemas.Local.v2020_07_22.IAutoloaderSchema  = {
	id: 'autoloader',
	name: 'Autoloader',
	description: 'A directory that is autoloaded',
	    fields: {
	            /** Source directory. */
	            'lookupDir': {
	                label: 'Source directory',
	                type: FieldType.Directory,
	                isRequired: true,
	                options: undefined
	            },
	            /** Destination. Where the file that does the autoloading is written */
	            'destination': {
	                label: 'Destination',
	                type: FieldType.File,
	                isRequired: true,
	                hint: 'Where the file that does the autoloading is written',
	                options: undefined
	            },
	            /** Pattern. */
	            'pattern': {
	                label: 'Pattern',
	                type: FieldType.Text,
	                isRequired: true,
	                defaultValue: "**/!(*.test).ts",
	                options: undefined
	            },
	    }
}

export default autoloaderSchema
