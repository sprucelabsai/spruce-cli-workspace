import handlebars from 'handlebars'
import { FieldDefinition, FieldType, SchemaField } from '@sprucelabs/schema'
import { ISchemaTypesTemplateItem } from '../../index'

/** Renders field options */
handlebars.registerHelper('fieldDefinitionOptions', function(
	fieldDefinition: FieldDefinition,
	renderAs,
	options
) {
	if (!fieldDefinition) {
		return '"**fieldDefinitionOptions error: MISSING FIELD DEFINITION"'
	}

	if (!options || (renderAs !== 'type' && renderAs !== 'value')) {
		throw new Error("fieldDefinitionOptions helper's second arg as type|value")
	}

	const {
		data: { root }
	} = options

	const schemaTemplateItems: ISchemaTypesTemplateItem[] | undefined =
		root && root.schemaTemplateItems

	if (!schemaTemplateItems) {
		throw new Error(
			'fieldDefinitionOptions needs schemaTemplateItems passed to parent template'
		)
	}

	const updatedOptions:
		| Record<string, any>
		| undefined = fieldDefinition.options && {
		...fieldDefinition.options
	}

	// If this is a schema type, we need to map it to it's proper value type
	if (fieldDefinition.type === FieldType.Schema && updatedOptions) {
		const value = handlebars.helpers.fieldDefinitionValueType(
			fieldDefinition,
			renderAs === 'type' ? 'definition' : 'value',
			options
		)

		// Swap out id for reference
		delete updatedOptions.schemaId
		delete updatedOptions.schema
		delete updatedOptions.schemaIds

		updatedOptions.schemas = value
	}

	// No options, undefined is acceptable
	if (Object.keys(updatedOptions ?? {}).length === 0) {
		return 'undefined'
	}

	let template = `{`
	Object.keys(updatedOptions ?? {}).forEach(key => {
		// @ts-ignore TODO how to type this
		const value = updatedOptions[key]
		template += `${key}: `
		if (key === 'schemas') {
			template += `${value},`
		} else if (typeof value !== 'string') {
			template += `${JSON.stringify(value)},`
		} else {
			template += `'${value.replace(/(['])/g, '\\$1')}',`
		}
	})

	template += '}'

	return template
})
