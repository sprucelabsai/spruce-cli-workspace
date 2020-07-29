import { buildErrorSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

const userNotFoundDefinition = buildErrorSchema({
	id: 'userNotFound',
	name: 'User not found',
	description: 'Could not find a user',
	fields: {
		token: {
			type: FieldType.Text,
			label: 'Token',
		},
		userId: {
			type: FieldType.Number,
			label: 'User id',
		},
	},
})

export default userNotFoundDefinition
