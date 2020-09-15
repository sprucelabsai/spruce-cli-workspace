import { SpruceErrors } from '../errors.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const directoryEmptySchema: SpruceErrors.SpruceCli.IDirectoryEmptySchema  = {
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
