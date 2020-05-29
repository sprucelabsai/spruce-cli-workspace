import { FieldDefinition, TemplateRenderAs } from '@sprucelabs/schema'
import handlebars from 'handlebars'
import { IValueTypes } from '../..'
import KeyGeneratorUtility from '../utilities/KeyGeneratorUtility'

/* The type for the value of a field. the special case is if the field is of type schema, then we get the target's interface */
handlebars.registerHelper('fieldDefinitionValueType', function(
	definition: FieldDefinition,
	renderAs: TemplateRenderAs,
	options
) {
	const {
		data: { root }
	} = options

	if (
		renderAs !== TemplateRenderAs.Value &&
		renderAs !== TemplateRenderAs.Type &&
		renderAs !== TemplateRenderAs.DefinitionType
	) {
		throw new Error(
			'fieldDefinitionValueType helper needs renderAs to be "TemplateRenderAs.Type" or "TemplateRenderAs.Value" or "TemplateRenderAs.DefinitionType"'
		)
	}

	const valueTypes: IValueTypes = root?.valueTypes
	if (!valueTypes) {
		throw new Error(
			'fieldDefinitionValueType helper needs a valueTypeGenerator in the root context'
		)
	}

	// If there is a value set on the definition, return that instead of the generated type
	if (typeof definition.value !== 'undefined') {
		if (typeof definition.value === 'string') {
			return '`' + definition.value + '`'
		} else {
			return JSON.stringify(definition.value)
		}
	}

	const key = KeyGeneratorUtility.generateFieldKey(renderAs, definition)
	const valueType = valueTypes[key]
	if (!valueType) {
		throw new Error(
			`Unable to render value type for field ${JSON.stringify(
				definition,
				null,
				2
			)}`
		)
	}

	return valueType
})
