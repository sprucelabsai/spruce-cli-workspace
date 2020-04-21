import handlebars from 'handlebars'
import {
	FieldDefinition,
	FieldClassMap,
	ISchemaTemplateItem,
	TemplateRenderAs,
	IFieldTemplateItem
} from '@sprucelabs/schema'

/* The type for the value of a field. the special case is if the field is of type schema, then we get the target's interface */
handlebars.registerHelper('fieldDefinitionValueType', function(
	fieldDefinition: FieldDefinition,
	renderAs: TemplateRenderAs,
	options
) {
	const {
		data: { root }
	} = options

	// Pull vars off context
	const schemaTemplateItems: ISchemaTemplateItem[] | undefined =
		root?.schemaTemplateItems
	const fieldTemplateItems: IFieldTemplateItem[] | undefined =
		root?.fieldTemplateItems

	if (
		renderAs !== TemplateRenderAs.Value &&
		renderAs !== TemplateRenderAs.Type &&
		renderAs !== TemplateRenderAs.DefinitionType
	) {
		throw new Error(
			'fieldDefinitionValueType helper needs renderAs to be "TemplateRenderAs.Type" or "TemplateRenderAs.Value" or "TemplateRenderAs.DefinitionType"'
		)
	}

	if (!schemaTemplateItems) {
		throw new Error(
			'fieldDefinitionValueType helper needs schemaTemplateItems is the root context'
		)
	}

	if (!fieldTemplateItems) {
		throw new Error(
			'fieldDefinitionValueType helper needs fieldTemplateItems is the root context'
		)
	}

	const { type } = fieldDefinition
	const FieldClass = FieldClassMap[type]

	// Find the matching field templateItem for this field type
	const fieldTemplateItem = fieldTemplateItems.find(
		item => item.pascalName === FieldClass.name
	)

	if (!fieldTemplateItem) {
		throw new Error(
			'Field was not found in template items, not sure how this could ever happen. TODO improve this error message when we know more!'
		)
	}

	const { valueType } = FieldClass.templateDetails({
		renderAs,
		importAs: fieldTemplateItem.importAs,
		templateItems: schemaTemplateItems,
		language: 'ts',
		globalNamespace: 'SpruceSchemas',
		// TODO why does this not pass?
		// @ts-ignore
		definition: fieldDefinition
	})

	return valueType
})
