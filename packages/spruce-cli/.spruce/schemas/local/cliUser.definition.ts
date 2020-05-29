import * as SpruceSchema from '@sprucelabs/schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'

const cliUserDefinition: SpruceSchemas.Local.CliUser.IDefinition = {
	id: 'cliUser',
	name: 'User',
	description: 'A stripped down user for the cli',
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
		}
	}
}

export default cliUserDefinition
