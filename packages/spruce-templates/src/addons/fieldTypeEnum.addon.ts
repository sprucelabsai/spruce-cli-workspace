import handlebars from 'handlebars'
import { FieldDefinition } from '#spruce/schemas/fields/fields.types'

/* The enum for schema.fields.fieldName.type as a string */
handlebars.registerHelper(
	'fieldTypeEnum',
	function (fieldDefinition: FieldDefinition) {
		if (!fieldDefinition) {
			throw new Error(
				'fieldTypeEnum helper needs a FieldDefinition as the first argument'
			)
		}

		const { type } = fieldDefinition

		return `'${type}'`
	}
)
