import handlebars from 'handlebars'
import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import { IFieldDefinition, FieldBase, FieldType } from '@sprucelabs/schema'

/** start case (cap first letter, lower rest) */
handlebars.registerHelper('startCase', val => {
	return _.startCase(val)
})

/** escape quotes */
handlebars.registerHelper('escape', function(variable) {
	return variable.replace(/(['])/g, '\\$1')
})

/** quick way to do an equals check against 2 values */
handlebars.registerHelper('isEqual', function(arg1, arg2, options) {
	//@ts-ignore // TODO how should this work in a typed environment?
	return arg1 == arg2 ? options.fn(this) : options.inverse(this)
})

/** The enum for schema.fields.fieldName.type as a string */
handlebars.registerHelper('fieldTypeEnum', function(
	fieldDefinition: IFieldDefinition
) {
	const field = FieldBase.field(fieldDefinition)
	return field.typeEnumString
})

/** the type for the value of a field. the special case is if the field is of type schema, then we get the target's interface */
handlebars.registerHelper('fieldValueType', function(
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

	let typeLiteral
	switch (fieldDefinition.type) {
		case FieldType.Schema: {
			for (const namespace of namespaces) {
				if (namespace.schemas[fieldDefinition.options.schemaId || '']) {
					typeLiteral =
						namespace.schemas[fieldDefinition.options.schemaId || '']
							.interfaceName
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
			typeLiteral = 'text'
	}

	if (fieldDefinition.isArray) {
		typeLiteral = typeLiteral + '[]'
	}

	return typeLiteral
})

// import actual templates
const templatePath = path.join(__dirname, 'src', 'templates')

// schema definitions
const schemaDefinitions: string = fs
	.readFileSync(path.join(templatePath, 'schema/definition.hbs'))
	.toString()

export const templates = { schemaDefinitions }

export default handlebars
