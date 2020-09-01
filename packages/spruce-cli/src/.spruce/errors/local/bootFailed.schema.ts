import { SpruceErrors } from '../errors.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const bootFailedSchema: SpruceErrors.Local.IBootFailedSchema  = {
	id: 'bootFailed',
	name: 'Boot failed',
	description: 'Booting your skill failed!',
	    fields: {
	    }
}

export default bootFailedSchema
