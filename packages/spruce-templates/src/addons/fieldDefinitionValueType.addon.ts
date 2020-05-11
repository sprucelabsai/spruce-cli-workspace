import handlebars from 'handlebars'
import { FieldDefinition, TemplateRenderAs } from '@sprucelabs/schema'
import { IValueTypeGenerator } from '../..'

/* The type for the value of a field. the special case is if the field is of type schema, then we get the target's interface */
handlebars.registerHelper('fieldDefinitionValueType', function(
	fieldDefinition: FieldDefinition,
	renderAs: TemplateRenderAs,
	options
) {
	const {
		data: { root }
	} = options

	const valueTypeGenerator: IValueTypeGenerator = root?.valueTypeGenerator

	if (
		renderAs !== TemplateRenderAs.Value &&
		renderAs !== TemplateRenderAs.Type &&
		renderAs !== TemplateRenderAs.DefinitionType
	) {
		throw new Error(
			'fieldDefinitionValueType helper needs renderAs to be "TemplateRenderAs.Type" or "TemplateRenderAs.Value" or "TemplateRenderAs.DefinitionType"'
		)
	}

	if (!valueTypeGenerator) {
		throw new Error(
			'fieldDefinitionValueType helper needs a valueTypeGenerator in the root context'
		)
	}

	const valueType = valueTypeGenerator(renderAs, fieldDefinition)

	return valueType
})
