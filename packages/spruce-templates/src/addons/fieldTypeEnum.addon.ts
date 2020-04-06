import handlebars from 'handlebars'
import { IFieldDefinition, FieldType } from '@sprucelabs/schema'

/* The enum for schema.fields.fieldName.type as a string */
handlebars.registerHelper('fieldTypeEnum', function(
	fieldDefinition: IFieldDefinition
) {
	if (!fieldDefinition) {
		return '"**fieldTypeEnum error: MISSING FIELD TYPE ENUM**"'
	}

	const keys = Object.keys(FieldType)
	const values = Object.values(FieldType)
	const match = values.indexOf(fieldDefinition.type)

	return `SpruceSchema.FieldType.${keys[match]}`
})
