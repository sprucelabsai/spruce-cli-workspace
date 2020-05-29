import * as SpruceSchema from '@sprucelabs/schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import profileImagedefinition from './profileImage.definition'

const userDefinition: SpruceSchemas.Core.User.IDefinition = {
	id: 'user',
	name: 'User',
	description: 'A human being.',

	fields: {
		/** Id. */
		id: {
			label: 'Id',
			type: SpruceSchema.FieldType.Id,

			isRequired: true,

			options: undefined
		},
		/** First name. */
		firstName: {
			label: 'First name',
			type: SpruceSchema.FieldType.Text,

			options: undefined
		},
		/** Last name. */
		lastName: {
			label: 'Last name',
			type: SpruceSchema.FieldType.Text,

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
		/** Phone. The person's phone number! */
		phoneNumber: {
			label: 'Phone',
			type: SpruceSchema.FieldType.Phone,

			hint: "The person's phone number!",

			options: undefined
		},
		/** Profile photos. */
		profileImages: {
			label: 'Profile photos',
			type: SpruceSchema.FieldType.Schema,

			options: { schemas: [profileImagedefinition] }
		},
		/** Default profile photos. */
		defaultProfileImages: {
			label: 'Default profile photos',
			type: SpruceSchema.FieldType.Schema,

			isRequired: true,

			options: { schemas: [profileImagedefinition] }
		}
	}
}

export default userDefinition
