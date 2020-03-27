import handlebars from 'handlebars'
import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import { IFieldDefinition, FieldType, FieldClassMap } from '@sprucelabs/schema'

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

/* The enum for schema.fields.fieldName.type as a string */
handlebars.registerHelper('fieldTypeEnum', function(
	fieldDefinition: IFieldDefinition
) {
	const keys = Object.keys(FieldType)
	const values = Object.values(FieldType)
	const match = values.indexOf(fieldDefinition.type)

	return `SpruceSchema.FieldType.${keys[match]}`
})

/* the type for the value of a field. the special case is if the field is of type schema, then we get the target's interface */
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

export default handlebars
