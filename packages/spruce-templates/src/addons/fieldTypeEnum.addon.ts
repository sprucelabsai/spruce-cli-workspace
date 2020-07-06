import { IFieldTemplateItem } from '@sprucelabs/schema'
import handlebars from 'handlebars'
import { FieldDefinition } from '#spruce/schemas/fields/fields.types'

/* The enum for schema.fields.fieldName.type as a string */
handlebars.registerHelper('fieldTypeEnum', function(
	fieldDefinition: FieldDefinition,
	options
) {
	if (!fieldDefinition) {
		throw new Error(
			'fieldTypeEnum helper needs a FieldDefinition as the first argument'
		)
	}

	const {
		data: { root }
	} = options

	const fieldTemplateItems: IFieldTemplateItem[] | undefined =
		root && root.fieldTemplateItems

	if (!fieldTemplateItems) {
		throw new Error(
			'fieldTypeEnum needs fieldTemplateItems passed to parent template'
		)
	}

	const { type } = fieldDefinition
	const matchingField = fieldTemplateItems.find(
		item => item.camelType.toLowerCase() === type.toLowerCase()
	)

	if (!matchingField) {
		throw new Error(`fieldTypeEnum`)
	}

	return `FieldType.${matchingField.pascalType}`
})
