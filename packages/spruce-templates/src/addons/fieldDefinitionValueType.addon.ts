import handlebars from 'handlebars'
import { FieldDefinition, FieldClassMap, FieldType } from '@sprucelabs/schema'
import { ISchemaTypesTemplateItem } from '../..'

/* The type for the value of a field. the special case is if the field is of type schema, then we get the target's interface */
handlebars.registerHelper('fieldDefinitionValueType', function(
	fieldDefinition: FieldDefinition,
	options
) {
	const {
		data: { root }
	} = options

	// Pull vars off context
	const schemaTemplateItems: ISchemaTypesTemplateItem[] | undefined =
		root?.schemaTemplateItems

	if (!schemaTemplateItems) {
		throw new Error('You must pass schemaTemplateItems to render this script')
	}

	const { type } = fieldDefinition
	const FieldClass = FieldClassMap[type]
	const { valueType } = FieldClass.templateDetails()

	let typeLiteral
	switch (fieldDefinition.type) {
		case FieldType.Schema: {
			const matchedTemplateItem = schemaTemplateItems.find(
				item => item.id === fieldDefinition.options.schemaId
			)

			if (matchedTemplateItem) {
				typeLiteral = `SpruceSchemas.${matchedTemplateItem.namespace}.${matchedTemplateItem.pascalName}.I${matchedTemplateItem.pascalName}`
			} else {
				throw new Error(
					`fieldDefinitionValueType help could not find schema ${fieldDefinition.options.schemaId}`
				)
			}

			break
		}
		default:
			typeLiteral = valueType
	}

	if (fieldDefinition.isArray) {
		typeLiteral = typeLiteral + '[]'
	}

	// If the type points to an interface, pull it off the schema
	// TODO handle when skill introduce their own field types
	return typeLiteral[0] === 'I' ? `SpruceSchema.${typeLiteral}` : typeLiteral
})
