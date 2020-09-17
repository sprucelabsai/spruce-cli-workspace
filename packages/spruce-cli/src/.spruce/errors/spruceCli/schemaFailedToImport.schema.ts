import { SpruceErrors } from '../errors.types'




const schemaFailedToImportSchema: SpruceErrors.SpruceCli.ISchemaFailedToImportSchema  = {
	id: 'schemaFailedToImport',
	name: 'Definition failed to import',
	description: 'The definition file failed to import',
	    fields: {
	            /** File. The file definition file I tried to import */
	            'file': {
	                label: 'File',
	                type: 'text',
	                isRequired: true,
	                hint: 'The file definition file I tried to import',
	                options: undefined
	            },
	    }
}

export default schemaFailedToImportSchema
