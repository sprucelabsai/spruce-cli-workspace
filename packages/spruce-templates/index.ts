import fs from 'fs'
import path from 'path'
import {
	ISchemaDefinition,
	ISchemaTemplateItem,
	IFieldTemplateItem
} from '@sprucelabs/schema'
import handlebars from 'handlebars'
import log from './src/lib/log'
// Import addons
import './src/addons/escape.addon'
import './src/addons/fieldDefinitionOptions.addon'
import './src/addons/fieldDefinitionValueType.addon'
import './src/addons/fieldTypeEnum.addon'
import './src/addons/operators.addon'
import './src/addons/startCase.addon'
import './src/addons/pascalCase.addon'
import './src/addons/fieldDefinitionPartial.addon'
import './src/addons/schemaDefinitionPartial.addon'
import './src/addons/schemaValuesPartial.addon'
import './src/addons/json.addon'
import './src/addons/isDefined.addon'
import {
	IValueTypeGenerator,
	IAutoLoaderTemplateItem
} from './src/types/template.types'
import importExtractor from './src/utilities/importExtractor'

log.info('Addons imported')

// Import actual templates
const templatePath = path.join(__dirname, 'src', 'templates', 'typescript')

// Template files
// TODO this can be done in a loop perhaps
const schemasTypes: string = fs
	.readFileSync(path.join(templatePath, 'schemas/schemas.types.hbs'))
	.toString()

const definition: string = fs
	.readFileSync(path.join(templatePath, 'schemas/definition.hbs'))
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

const fieldsTypes: string = fs
	.readFileSync(path.join(templatePath, 'schemas/fields/fields.types.hbs'))
	.toString()

const fieldClassMap: string = fs
	.readFileSync(path.join(templatePath, 'schemas/fields/fieldClassMap.hbs'))
	.toString()

const fieldType: string = fs
	.readFileSync(path.join(templatePath, 'schemas/fields/fieldType.hbs'))
	.toString()

// Template generators
export const templates = {
	/** All definitions */
	schemasTypes(options: {
		schemaTemplateItems: ISchemaTemplateItem[]
		fieldTemplateItems: IFieldTemplateItem[]
		valueTypeGenerator: IValueTypeGenerator
	}) {
		const imports = importExtractor(options.fieldTemplateItems)
		const template = handlebars.compile(schemasTypes)
		return template({ ...options, imports })
	},

	/** When building a definition in a skill */
	definition(options: {
		nameCamel: string
		description: string
		namePascal: string
		nameReadable: string
	}) {
		const template = handlebars.compile(definition)
		return template(options)
	},

	/** For creating an error class */
	error(options: {
		errors: { namePascal: string; nameReadable: string }[]
		renderClassDefinition?: boolean
	}) {
		const template = handlebars.compile(error)
		return template({ renderClassDefinition: true, ...options })
	},

	/** For generating types file this error (the ISpruceErrorOptions sub-interface) */
	errorTypes(options: {
		definition: ISchemaDefinition
		schemaTemplateItems: ISchemaTemplateItem[]
		nameCamel: string
		relativeToDefinition: string
		namePascal: string
		description: string
	}) {
		const template = handlebars.compile(errorTypes)
		return template(options)
	},

	/** For generating types for all the options (the ISpruceErrorOptions sub-interface) */
	errorOptionsTypes(options: {
		options: { nameCamel: string; namePascal: string }[]
	}) {
		const template = handlebars.compile(errorOptionsTypes)
		return template(options)
	},

	/** For generating types for all the options (the ISpruceErrorOptions sub-interface) */
	errorCodesTypes(options: {
		codes: { namePascal: string; nameConst: string; description: string }[]
	}) {
		const template = handlebars.compile(errorCodesTypes)
		return template(options)
	},

	/** An error definition file */
	errorDefinition(options: {
		nameCamel: string
		nameReadable: string
		description: string
	}) {
		const template = handlebars.compile(errorDefinition)
		return template(options)
	},

	/** Schema example */
	schemaExample(options: {
		nameCamel: string
		namePascal: string
		definition: ISchemaDefinition
	}) {
		const template = handlebars.compile(schemaExample)
		return template(options)
	},

	/** Error example */
	errorExample(options: {
		nameCamel: string
		namePascal: string
		definition: ISchemaDefinition
	}) {
		const template = handlebars.compile(errorExample)
		return template(options)
	},

	/** Test file */
	test(options: { namePascal: string }) {
		const template = handlebars.compile(test)
		return template(options)
	},

	/** Autoloader */
	autoloader(options: IAutoLoaderTemplateItem) {
		const template = handlebars.compile(autoloader)
		return template(options)
	},

	/** The types file for all the schema fields being used */
	fieldsTypes(options: { fieldTemplateItems: IFieldTemplateItem[] }) {
		const template = handlebars.compile(fieldsTypes)
		return template(options)
	},
	/** Global mapping of all fields for lookup by type */
	fieldClassMap(options: { fieldTemplateItems: IFieldTemplateItem[] }) {
		const template = handlebars.compile(fieldClassMap)
		return template(options)
	},

	/** The field type enum */
	fieldType(options: { fieldTemplateItems: IFieldTemplateItem[] }) {
		const template = handlebars.compile(fieldType)
		return template(options)
	}
}

/** All the templates */
export type Templates = typeof templates
export { default as importExtractor } from './src/utilities/importExtractor'

export { default as TemplateDirectory } from './src/TemplateDirectory'
export * from './src/TemplateDirectory'

export default handlebars
export * from './src/types/template.types'
