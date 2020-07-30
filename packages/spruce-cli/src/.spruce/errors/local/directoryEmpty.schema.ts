import { SpruceErrors } from '../errors.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const directoryEmptySchema: SpruceErrors.Local.IDirectoryEmptySchema  = {
	id: 'directoryEmpty',
	name: 'directory empty',
	    fields: {
	            /** . */
	            'directory': {
	                type: FieldType.Text,
	                isRequired: true,
	                options: undefined
	            },
	    }
}

export default directoryEmptySchema
