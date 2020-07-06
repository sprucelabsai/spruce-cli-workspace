import { TemplateRenderAs } from '@sprucelabs/schema'
import handlebars from 'handlebars'
import { IValueTypes } from '../types/templates.types'

/* The type for the value of a field. the special case is if the field is of type schema, then we get the target's interface */
handlebars.registerHelper('valueTypeLiteral', function(
	namespace: string,
	schemaId: string,
	version: string,
	fieldName: string,
	renderAs: TemplateRenderAs,
	options
) {
	if (!namespace) {
		throw new Error('valueTypeLiteral needs namespace as 1st argument')
	}

	if (!schemaId) {
		throw new Error('valueTypeLiteral needs schemaId as 2st argument')
	}

	if (!fieldName) {
		throw new Error('valueTypeLiteral needs fieldName as 3st argument')
	}

	if (
		renderAs !== TemplateRenderAs.Value &&
		renderAs !== TemplateRenderAs.Type &&
		renderAs !== TemplateRenderAs.DefinitionType
	) {
		throw new Error(
			'valueTypeLiteral helper needs renderAs to be "TemplateRenderAs.Type" or "TemplateRenderAs.Value" or "TemplateRenderAs.DefinitionType"'
		)
	}

	const {
		data: { root }
	} = options

	const valueTypes: IValueTypes = root?.valueTypes
	if (!valueTypes) {
		throw new Error(
			'valueTypeLiteral helper needs a valueTypeGenerator in the root context'
		)
	}

	const valueType =
		valueTypes[namespace]?.[schemaId]?.[version]?.[fieldName]?.[renderAs]

	if (!valueType) {
		throw new Error(
			`Unable to render value type for field "${namespace}.${schemaId}.${version}.${renderAs}"`
		)
	}

	return valueType
})
