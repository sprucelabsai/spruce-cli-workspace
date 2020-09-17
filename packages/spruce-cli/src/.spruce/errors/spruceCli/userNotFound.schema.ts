import { SpruceErrors } from '../errors.types'




const userNotFoundSchema: SpruceErrors.SpruceCli.IUserNotFoundSchema  = {
	id: 'userNotFound',
	name: 'User not found',
	description: 'Could not find a user',
	    fields: {
	            /** Token. */
	            'token': {
	                label: 'Token',
	                type: 'text',
	                options: undefined
	            },
	            /** User id. */
	            'userId': {
	                label: 'User id',
	                type: 'number',
	                options: undefined
	            },
	    }
}

export default userNotFoundSchema
