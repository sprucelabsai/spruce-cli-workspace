import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const userNotFoundSchema: SpruceErrors.SpruceCli.IUserNotFoundSchema  = {
	id: 'userNotFound',
	namespace: 'SpruceCli',
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

SchemaRegistry.getInstance().trackSchema(userNotFoundSchema)

export default userNotFoundSchema
