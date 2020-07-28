import { buildSchemaDefinition } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import userDefinition from '#spruce/schemas/spruce/v2020_07_22/person.definition'

export default buildSchemaDefinition({
	...userDefinition,
	id: 'cliUserWithToken',
	description: 'A stripped down cli user with token details for login',
	fields: {
		id: userDefinition.fields.id,
		casualName: userDefinition.fields.casualName,
		token: { type: FieldType.Text, isRequired: true },
		isLoggedIn: {
			type: FieldType.Boolean,
			label: 'Logged in',
		},
	},
})
