import handlebars from 'handlebars'
import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import {
	IFieldDefinition,
	FieldType,
	FieldClassMap,
	ISchemaDefinitionMapValue
} from '@sprucelabs/schema'

/* start case (cap first letter, lower rest) */
handlebars.registerHelper('startCase', val => {
	return _.startCase(val)
})

/* escape quotes */
handlebars.registerHelper('escape', function(variable) {
	return variable && variable.replace(/(['])/g, '\\$1')
})

/* quick way to do an equals check against 2 values */
handlebars.registerHelper('isEqual', function(arg1, arg2, options) {
	//@ts-ignore // TODO how should this work in a typed environment?
	return arg1 == arg2 ? options.fn(this) : options.inverse(this)
})

/* the enum for schema.fields.fieldName.type as a string */
handlebars.registerHelper('fieldTypeEnum', function(
	fieldDefinition: IFieldDefinition
) {
	if (!fieldDefinition) {
		return '"**fieldTypeEnum error: MISSING FIELD TYPE ENUM**"'
	}

	const keys = Object.keys(FieldType)
	const values = Object.values(FieldType)
	const match = values.indexOf(fieldDefinition.type)

	return `SpruceSchema.FieldType.${keys[match]}`
})

/** drop in the value of a field which quotes if needed */
handlebars.registerHelper('fieldValue', function(
	fieldDefinition: IFieldDefinition,
	value: any
) {
	if (value) {
		// TODO finish this
		console.log(fieldDefinition, value)
		throw new Error('field value not yet implemented')
	}

	return value
})

/** renders field options */
handlebars.registerHelper('fieldDefinitionOptions', function(
	fieldDefinition: IFieldDefinition,
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

	const namespaces = root && root.namespaces
	const updatedOptions = fieldDefinition.options && {
		...fieldDefinition.options
	}

	// if this is a schema type, we need to map it to the related definition
	if (fieldDefinition.type === FieldType.Schema && updatedOptions) {
		for (const namespace of namespaces) {
			if (namespace.schemas[fieldDefinition.options.schemaId || '']) {
				// pull out schema
				const map = namespace.schemas[
					fieldDefinition.options.schemaId || ''
				] as ISchemaDefinitionMapValue

				// @ts-ignore TODO find out how to type this properly
				delete updatedOptions.schemaId

				// @ts-ignore TODO find out how to type this properly
				updatedOptions.schema = `SpruceSchemas.${namespace.namespace}.${
					map.typeName
				}.${renderAs === 'type' ? 'IDefinition' : 'definition'}`
				break
			}
		}
	}

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

/* the type for the value of a field. the special case is if the field is of type schema, then we get the target's interface */
handlebars.registerHelper('fieldDefinitionValueType', function(
	fieldDefinition: IFieldDefinition,
	options
) {
	const {
		data: { root }
	} = options

	const namespaces = root && root.namespaces
	const typeMap = root && root.typeMap

	if (!namespaces || !typeMap) {
		throw new Error(
			'You must pass namespaces and a typeMap to render this script'
		)
	}

	const { type } = fieldDefinition
	const FieldClass = FieldClassMap[type]
	const { valueType } = FieldClass.templateDetails()

	let typeLiteral
	switch (fieldDefinition.type) {
		case FieldType.Schema: {
			// if this is a schema field, find the other interface to point to
			for (const namespace of namespaces) {
				if (namespace.schemas[fieldDefinition.options.schemaId || '']) {
					// pull out schema
					const schema =
						namespace.schemas[fieldDefinition.options.schemaId || '']

					// path to schema including namespaces
					typeLiteral = `SpruceSchemas.${namespace.namespace}.${schema.typeName}.${schema.interfaceName}`
					break
				}
			}
			if (!typeLiteral) {
				throw new Error(
					`could not find schema with id ${fieldDefinition.options.schemaId}`
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

// import actual templates
const templatePath = path.join(__dirname, 'src', 'templates')

// schema definitions
const schemaDefinitions: string = fs
	.readFileSync(path.join(templatePath, 'schema/definitions.hbs'))
	.toString()

export const templates = {
	schemaDefinitions: handlebars.compile(schemaDefinitions)
}

// partials
const schemaPartial: string = fs
	.readFileSync(path.join(templatePath, 'schema/schemaDefinition.hbs'))
	.toString()

handlebars.registerPartial('schemaDefinition', schemaPartial)

const fieldPartial: string = fs
	.readFileSync(path.join(templatePath, 'schema/fieldDefinition.hbs'))
	.toString()

handlebars.registerPartial('fieldDefinition', fieldPartial)

export default handlebars
