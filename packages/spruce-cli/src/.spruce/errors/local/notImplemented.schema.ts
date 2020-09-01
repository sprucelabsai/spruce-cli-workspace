import { SpruceErrors } from '../errors.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const notImplementedSchema: SpruceErrors.Local.INotImplementedSchema  = {
	id: 'notImplemented',
	name: 'Not implemented',
	description: 'This feature has not been implemented',
	    fields: {
	    }
}

export default notImplementedSchema
