import { SpruceErrors } from '../errors.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const userNotFoundSchema: SpruceErrors.Local.IUserNotFoundSchema  = {
	id: 'userNotFound',
	name: 'User not found',
	description: 'Could not find a user',
	    fields: {
	            /** Token. */
	            'token': {
	                label: 'Token',
	                type: FieldType.Text,
	                options: undefined
	            },
	            /** User id. */
	            'userId': {
	                label: 'User id',
	                type: FieldType.Number,
	                options: undefined
	            },
	    }
}

export default userNotFoundSchema
