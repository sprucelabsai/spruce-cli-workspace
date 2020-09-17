import { buildErrorSchema } from '@sprucelabs/schema'

const userNotFoundDefinition = buildErrorSchema({
	id: 'userNotFound',
	name: 'User not found',
	description: 'Could not find a user',
	fields: {
		token: {
			type: 'text',
			label: 'Token',
		},
		userId: {
			type: 'number',
			label: 'User id',
		},
	},
})

export default userNotFoundDefinition
