import handlebars from 'handlebars'
import {
	FieldDefinition,
	FieldClassMap,
	FieldType,
	SchemaField
} from '@sprucelabs/schema'
import { ISchemaTypesTemplateItem } from '../..'

/* The type for the value of a field. the special case is if the field is of type schema, then we get the target's interface */
handlebars.registerHelper('fieldDefinitionValueType', function(
	fieldDefinition: FieldDefinition,
	renderAs: string,
	options
) {
	const {
		data: { root }
	} = options

	// Pull vars off context
	const schemaTemplateItems: ISchemaTypesTemplateItem[] | undefined =
		root?.schemaTemplateItems

	if (
		renderAs !== 'value' &&
		renderAs !== 'type' &&
		renderAs !== 'definition'
	) {
		throw new Error(
			'fieldDefinitionValueType helper needs renderAs to be "type" or "value"'
		)
	}

	if (!schemaTemplateItems) {
		throw new Error(
			'fieldDefinitionValueType helper needs schemaTemplateItems is the root context'
		)
	}

	const { type } = fieldDefinition
	const FieldClass = FieldClassMap[type]
	const { valueType } = FieldClass.templateDetails()

	let typeLiteral
	switch (fieldDefinition.type) {
		case FieldType.Schema: {
			const schemaIds = SchemaField.normalizeOptionsToSchemaIds(fieldDefinition)
			const ids: string[] = []

			schemaIds.forEach(schemaId => {
				const matchedTemplateItem = schemaTemplateItems.find(
					item => item.id === schemaId
				)

				if (matchedTemplateItem) {
					ids.push(
						`SpruceSchemas.${matchedTemplateItem.namespace}.${
							renderAs === 'type'
								? `I${matchedTemplateItem.pascalName}`
								: matchedTemplateItem.pascalName
						}${
							renderAs === 'type'
								? ``
								: renderAs === 'definition'
								? `.IDefinition`
								: `.definition`
						}`
					)
				} else {
					throw new Error(
						`fieldDefinitionValueType help could not find schema ${fieldDefinition.options.schemaIds?.join(
							', '
						)}`
					)
				}
			})

			if (renderAs === 'type') {
				typeLiteral = ids.join(' | ')
			} else {
				typeLiteral = '[' + ids.join(', ') + ']'
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
