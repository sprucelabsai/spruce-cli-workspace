import { SpruceErrors } from '../errors.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const failedToImportSchema: SpruceErrors.SpruceCli.IFailedToImportSchema  = {
	id: 'failedToImport',
	name: 'FailedToImport',
	description: 'Failed to import a file through VM',
	    fields: {
	            /** File. The file I tried to import */
	            'file': {
	                label: 'File',
	                type: FieldType.Text,
	                isRequired: true,
	                hint: 'The file I tried to import',
	                options: undefined
	            },
	    }
}

export default failedToImportSchema
