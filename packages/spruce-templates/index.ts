import handlebars from 'handlebars'
import fs from 'fs'
import path from 'path'
import log from './src/lib/log'

import { IFieldTemplateDetails, ISchemaDefinition } from '@sprucelabs/schema'

// Import addons
import './src/addons/escape.addon'
import './src/addons/fieldDefinitionOptions.addon'
import './src/addons/fieldDefinitionValueType.addon'
import './src/addons/fieldTypeEnum.addon'
import './src/addons/fieldValue.addon'
import './src/addons/isEqual.addon'
import './src/addons/startCase.addon'
import './src/addons/camelCase.addon'
import './src/addons/pascalCase.addon'
import './src/addons/fieldDefinitionPartial.addon'
import './src/addons/schemaDefinitionPartial.addon'
import './src/addons/schemaValuesPartial.addon'

log.info('Addons imported')

// Extra definitions
// TODO where do these go?
export interface ISchemaTemplateNames {
	pascalName: string
	camelName: string
	readableName: string
}
export interface ISchemaTypesTemplateItem extends ISchemaTemplateNames {
	namespace: string
	id: string
	definition: ISchemaDefinition
}

export interface IFieldTypesTemplateItem extends ISchemaTemplateNames {
	/** There package where the field definition lives */
	package: string
	/** The key for the FieldType enum */
	pascalType: string
	/** The value used for the FieldType enum */
	camelType: string
	/** Is this field type introduced by the skill be worked on right meow */
	isLocal: boolean
	/** The description associated with the field */
	description: string
}

// Import actual templates
const templatePath = path.join(__dirname, 'src', 'templates', 'typescript')

// Template files
// TODO this can be done in a loop perhaps
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
	.readFileSync(path.join(templatePath, 'errors/SpruceError.hbs'))
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

const test: string = fs
	.readFileSync(path.join(templatePath, 'tests/Test.test.hbs'))
	.toString()

const autoloader: string = fs
	.readFileSync(path.join(templatePath, 'autoloader/autoloader.hbs'))
	.toString()

const fieldTypes: string = fs
	.readFileSync(path.join(templatePath, 'schemas/fields/fields.types.hbs'))
	.toString()

const fieldType: string = fs
	.readFileSync(path.join(templatePath, 'schemas/fields/fieldType.hbs'))
	.toString()

// Template generators
export const templates = {
	/** All definitions */
	schemaTypes(options: {
		schemaTemplateItems: ISchemaTypesTemplateItem[]
		typeMap: { [fieldType: string]: IFieldTemplateDetails }
	}) {
		const template = handlebars.compile(schemaTypes)
		return template(options)
	},

	/** When building a definition in a skill */
	definition(options: {
		camelName: string
		description: string
		pascalName: string
		readableName: string
	}) {
		const template = handlebars.compile(definition)
		return template(options)
	},

	/** For creating an error class */
	error(options: {
		errors: { pascalName: string; readableName: string }[]
		renderClassDefinition?: boolean
	}) {
		const template = handlebars.compile(error)
		return template({ renderClassDefinition: true, ...options })
	},

	/** For generating types file this error (the ISpruceErrorOptions sub-interface) */
	errorTypes(options: {
		definition: ISchemaDefinition
		schemaTemplateItems: ISchemaTypesTemplateItem[]
		camelName: string
		relativeToDefinition: string
		pascalName: string
		description: string
	}) {
		const template = handlebars.compile(errorTypes)
		return template(options)
	},

	/** For generating types for all the options (the ISpruceErrorOptions sub-interface) */
	errorOptionsTypes(options: {
		options: { camelName: string; pascalName: string }[]
	}) {
		const template = handlebars.compile(errorOptionsTypes)
		return template(options)
	},

	/** For generating types for all the options (the ISpruceErrorOptions sub-interface) */
	errorCodesTypes(options: {
		codes: { pascalName: string; constName: string; description: string }[]
	}) {
		const template = handlebars.compile(errorCodesTypes)
		return template(options)
	},

	/** An error definition file */
	errorDefinition(options: {
		camelName: string
		readableName: string
		description: string
	}) {
		const template = handlebars.compile(errorDefinition)
		return template(options)
	},

	/** Schema example */
	schemaExample(options: {
		camelName: string
		pascalName: string
		definition: ISchemaDefinition
	}) {
		const template = handlebars.compile(schemaExample)
		return template(options)
	},

	/** Error example */
	errorExample(options: {
		camelName: string
		pascalName: string
		definition: ISchemaDefinition
	}) {
		const template = handlebars.compile(errorExample)
		return template(options)
	},

	/** Test file */
	test(options: { pascalName: string }) {
		const template = handlebars.compile(test)
		return template(options)
	},

	/** Autoloader */
	autoloader(options: {
		abstractClassName: string
		abstractClassRelativePath: string
		classes: {
			constructorOptionsInterfaceName?: string
			className: string
			relativeFilePath: string
		}[]
		interfaces: {
			interfaceName: string
			relativeFilePath: string
		}[]
		fileName: string
	}) {
		const template = handlebars.compile(autoloader)
		return template(options)
	},

	/** The types file for all the schema fields being used*/
	fieldTypes(options: { fields: IFieldTypesTemplateItem[] }) {
		const template = handlebars.compile(fieldTypes)
		return template(options)
	},

	/** The field type enum */
	fieldType(options: { fields: IFieldTypesTemplateItem[] }) {
		const template = handlebars.compile(fieldType)
		return template(options)
	}
}

/** All the templates */
export type Templates = typeof templates

export default handlebars
