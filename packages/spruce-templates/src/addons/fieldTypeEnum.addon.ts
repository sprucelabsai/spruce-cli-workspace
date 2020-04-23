import handlebars from 'handlebars'
import { FieldDefinition } from '@sprucelabs/schema'

/* The enum for schema.fields.fieldName.type as a string */
handlebars.registerHelper('fieldTypeEnum', function(
	fieldDefinition: FieldDefinition
) {
	if (!fieldDefinition) {
		return '"**fieldTypeEnum error: MISSING FIELD TYPE ENUM**"'
	}

	debugger

	// Const keys = Object.keys(FieldType)
	// const values = Object.values(FieldType)
	// const match = values.indexOf(fieldDefinition.type)

	const type = 'Text'
	return `SpruceSchema.FieldType.${type}`
})
