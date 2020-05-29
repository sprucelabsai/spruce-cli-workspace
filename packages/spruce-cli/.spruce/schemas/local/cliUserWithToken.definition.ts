import * as SpruceSchema from '@sprucelabs/schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'

const cliUserWithTokenDefinition: SpruceSchemas.Local.CliUserWithToken.IDefinition = {
	id: 'cliUserWithToken',
	name: 'User',
	description: 'A stripped down cli user with token details for login',
	fields: {
		/** Id. */
		id: {
			label: 'Id',
			type: SpruceSchema.FieldType.Id,
			isRequired: true,
			options: undefined
		},
		/** Casual name. Generated name that defaults to Friend! */
		casualName: {
			label: 'Casual name',
			type: SpruceSchema.FieldType.Text,
			isRequired: true,
			hint: 'Generated name that defaults to Friend!',
			options: undefined
		},
		/** . */
		token: {
			type: SpruceSchema.FieldType.Text,
			isRequired: true,
			options: undefined
		},
		/** Logged in. */
		isLoggedIn: {
			label: 'Logged in',
			type: SpruceSchema.FieldType.Boolean,
			options: undefined
		}
	}
}

export default cliUserWithTokenDefinition
