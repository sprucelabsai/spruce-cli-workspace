import handlebars from 'handlebars'
import {
	FieldDefinition,
	ISchemaTemplateItem,
	FieldType
} from '@sprucelabs/schema'

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

	const schemaTemplateItems:
		| (ISchemaTemplateItem & { namespace: string })[]
		| undefined = root && root.schemaTemplateItems

	if (!schemaTemplateItems) {
		throw new Error(
			'fiendDefinitionOptions needs schemaTemplateItems passed to parent template'
		)
	}

	const updatedOptions:
		| Record<string, any>
		| undefined = fieldDefinition.options && {
		...fieldDefinition.options
	}

	// If this is a schema type, we need to map it to the related definition
	if (fieldDefinition.type === FieldType.Schema && updatedOptions) {
		const matchedTemplateItem = schemaTemplateItems.find(
			item => item.id === updatedOptions.schemaId
		)

		// Swap out id for reference
		if (matchedTemplateItem) {
			delete updatedOptions.schemaId
			updatedOptions.schema = `SpruceSchemas.${matchedTemplateItem.namespace}.${
				matchedTemplateItem.typeName
			}.${renderAs === 'type' ? 'IDefinition' : 'definition'}`
		} else {
			throw new Error('fieldDefinitionOptions could not find schema ${}')
		}
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
		if (key === 'schemaId' || key === 'schema') {
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
