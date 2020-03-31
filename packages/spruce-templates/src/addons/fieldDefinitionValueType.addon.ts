import handlebars from 'handlebars'
import {
	IFieldDefinition,
	ISchemaTemplateItem,
	FieldClassMap,
	FieldType
} from '@sprucelabs/schema'

/* the type for the value of a field. the special case is if the field is of type schema, then we get the target's interface */
handlebars.registerHelper('fieldDefinitionValueType', function(
	fieldDefinition: IFieldDefinition,
	options
) {
	const {
		data: { root }
	} = options

	// pull vars off context
	const schemaTemplateItems:
		| (ISchemaTemplateItem & { namespace: string })[]
		| undefined = root && root.schemaTemplateItems
	const typeMap = root && root.typeMap

	if (!schemaTemplateItems || !typeMap) {
		throw new Error(
			'You must pass schemaTemplateItems and a typeMap to render this script'
		)
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
				typeLiteral = `SpruceSchemas.${matchedTemplateItem.namespace}.${matchedTemplateItem.typeName}.${matchedTemplateItem.interfaceName}`
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

	// if the type points to an interface, pull it off the schema
	// TODO handle when skill introduce their own field types
	return typeLiteral[0] === 'I' ? `SpruceSchema.${typeLiteral}` : typeLiteral
})
