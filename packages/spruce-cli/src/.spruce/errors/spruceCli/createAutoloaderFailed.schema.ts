import { SpruceErrors } from '../errors.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const createAutoloaderFailedSchema: SpruceErrors.SpruceCli.ICreateAutoloaderFailedSchema  = {
	id: 'createAutoloaderFailed',
	name: 'Could not create an autoloader',
	description: 'Autoloader creation failed',
	    fields: {
	            /** The globby pattern used to find files. Globby pattern */
	            'globbyPattern': {
	                label: 'The globby pattern used to find files',
	                type: FieldType.Text,
	                isRequired: true,
	                hint: 'Globby pattern',
	                options: undefined
	            },
	            /** The files that were loaded. The files that were loaded */
	            'filePaths': {
	                label: 'The files that were loaded',
	                type: FieldType.Text,
	                isRequired: true,
	                hint: 'The files that were loaded',
	                isArray: true,
	                options: undefined
	            },
	            /** The suffix for classes to autoload. Class suffix */
	            'suffix': {
	                label: 'The suffix for classes to autoload',
	                type: FieldType.Text,
	                isRequired: true,
	                hint: 'Class suffix',
	                options: undefined
	            },
	            /** The directory we're trying to create the autoloader for. Directory to autoload */
	            'directory': {
	                label: 'The directory we\'re trying to create the autoloader for',
	                type: FieldType.Text,
	                isRequired: true,
	                hint: 'Directory to autoload',
	                options: undefined
	            },
	    }
}

export default createAutoloaderFailedSchema
