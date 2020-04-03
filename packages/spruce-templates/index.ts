import handlebars from 'handlebars'
import fs from 'fs'
import path from 'path'
import log from '@sprucelabs/log'

import {
	ISchemaTemplateItem,
	IFieldTemplateDetails,
	ISchemaDefinition
} from '@sprucelabs/schema'

// import addons
import * as escape from './src/addons/escape.addon'
import * as fieldDefinitionOptions from './src/addons/fieldDefinitionOptions.addon'
import * as fieldDefinitionValueType from './src/addons/fieldDefinitionValueType.addon'
import * as fieldTypeEnum from './src/addons/fieldTypeEnum.addon'
import * as fieldValue from './src/addons/fieldValue.addon'
import * as isEqual from './src/addons/isEqual.addon'
import * as startCase from './src/addons/startCase.addon'

log.info('addon escape', escape)
log.info('addon fieldDefinitionOptions', fieldDefinitionOptions)
log.info('addon fieldDefinitionValueType', fieldDefinitionValueType)
log.info('addon fieldTypeEnum', fieldTypeEnum)
log.info('addon fieldValue', fieldValue)
log.info('addon isEqual', isEqual)
log.info('addon startCase', startCase)

// import actual templates
const templatePath = path.join(__dirname, 'src', 'templates', 'typescript')

// template files
const schemaTypes: string = fs
	.readFileSync(path.join(templatePath, 'schemas/schema.types.hbs'))
	.toString()

const definition: string = fs
	.readFileSync(path.join(templatePath, 'schemas/definition.hbs'))
	.toString()

const definitionTypes: string = fs
	.readFileSync(path.join(templatePath, 'schemas/definition.types.hbs'))
	.toString()

const schemaExample: string = fs
	.readFileSync(path.join(templatePath, 'schemas/example.hbs'))
	.toString()

const error: string = fs
	.readFileSync(path.join(templatePath, 'errors/Error.hbs'))
	.toString()

const errorTypes: string = fs
	.readFileSync(path.join(templatePath, 'errors/error.types.hbs'))
	.toString()

const errorOptionsTypes: string = fs
	.readFileSync(path.join(templatePath, 'errors/options.types.hbs'))
	.toString()

const errorCodesTypes: string = fs
	.readFileSync(path.join(templatePath, 'errors/codes.types.hbs'))
	.toString()

const errorDefinition: string = fs
	.readFileSync(path.join(templatePath, 'errors/definition.hbs'))
	.toString()

const errorExample: string = fs
	.readFileSync(path.join(templatePath, 'errors/example.hbs'))
	.toString()

// template generators
export const templates = {
	/** all definitions */
	schemaTypes(options: {
		schemaTemplateItems: ISchemaTemplateItem[]
		typeMap: { [fieldType: string]: IFieldTemplateDetails }
	}) {
		const template = handlebars.compile(schemaTypes)
		return template(options)
	},

	/** when building a definition in a skill */
	definition(options: {
		camelName: string
		description: string
		pascalName: string
		readableName: string
	}) {
		const template = handlebars.compile(definition)
		return template(options)
	},

	/** the types file to support a definition */
	definitionTypes(options: {
		camelName: string
		pascalName: string
		relativeToDefinition: string
		description: string
	}) {
		const template = handlebars.compile(definitionTypes)
		return template(options)
	},

	/** for creating an error class */
	error(options: {
		pascalName: string
		readableName: string
		renderClassDefinition?: boolean
	}) {
		const template = handlebars.compile(error)
		return template({ renderClassDefinition: true, ...options })
	},

	/** for generating types file this error (the ISpruceErrorOptions sub-interface) */
	errorTypes(options: {
		camelName: string
		relativeToDefinition: string
		pascalName: string
		description: string
	}) {
		const template = handlebars.compile(errorTypes)
		return template(options)
	},

	/** for generating types for all the options (the ISpruceErrorOptions sub-interface) */
	errorOptionsTypes(options: {
		options: { camelName: string; pascalName: string }[]
	}) {
		const template = handlebars.compile(errorOptionsTypes)
		return template(options)
	},

	/** for generating types for all the options (the ISpruceErrorOptions sub-interface) */
	errorCodesTypes(options: {
		codes: { pascalName: string; constName: string; description: string }[]
	}) {
		const template = handlebars.compile(errorCodesTypes)
		return template(options)
	},

	/** an error definition file */
	errorDefinition(options: {
		camelName: string
		readableName: string
		description: string
	}) {
		const template = handlebars.compile(errorDefinition)
		return template(options)
	},

	/** schema example */
	schemaExample(options: {
		camelName: string
		pascalName: string
		definition: ISchemaDefinition
	}) {
		const template = handlebars.compile(schemaExample)
		return template(options)
	},

	/** error example */
	errorExample(options: {
		camelName: string
		pascalName: string
		definition: ISchemaDefinition
	}) {
		const template = handlebars.compile(errorExample)
		return template(options)
	}
}

/** all the templates */
export type Templates = typeof templates

// partials
const schemaPartial: string = fs
	.readFileSync(
		path.join(templatePath, 'schemas/partials/schemaDefinition.hbs')
	)
	.toString()

handlebars.registerPartial('schemaDefinition', schemaPartial)

const fieldPartial: string = fs
	.readFileSync(path.join(templatePath, 'schemas/partials/fieldDefinition.hbs'))
	.toString()

handlebars.registerPartial('fieldDefinition', fieldPartial)

export default handlebars
