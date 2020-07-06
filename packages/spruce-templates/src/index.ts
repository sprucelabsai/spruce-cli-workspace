import fs from 'fs'
import path from 'path'
import {
	ISchemaDefinition,
	ISchemaTemplateItem,
	IFieldTemplateItem
} from '@sprucelabs/schema'
import { TemplateRenderAs } from '@sprucelabs/schema'
import handlebars from 'handlebars'
import { FieldDefinition } from '#spruce/schemas/fields/fields.types'
import log from './singletons/log'
// Import addons
import './addons/escape.addon'
import './addons/fieldDefinitionOptions.addon'
import './addons/valueTypeLiteral.addon'
import './addons/fieldTypeEnum.addon'
import './addons/operators.addon'
import './addons/gt.addon'
import './addons/importRelatedDefinitions.addon'
import './addons/pascalCase.addon'
import './addons/fieldDefinitionPartial.addon'
import './addons/schemaDefinitionPartial.addon'
import './addons/schemaValuesPartial.addon'
import './addons/valueTypeGenerator.addon'
import './addons/json.addon'
import './addons/isDefined.addon'
import {
	IAutoLoaderTemplateItem,
	IDirectoryTemplateFile,
	DirectoryTemplateKind,
	IDirectoryTemplateContextMap,
	IValueTypes,
	IDefinitionBuilderTemplateItem,
	IErrorOptions,
	IErrorTemplateItem
} from './types/templates.types'
import DirectoryTemplateUtility from './utilities/DirectoryTemplateUtility'
import importExtractorUtil from './utilities/importExtractor.utility'
import KeyGeneratorUtility from './utilities/KeyGeneratorUtility'
import templateItemUtil from './utilities/templateItem.utility'

log.info('Addons imported')

// Import actual templates
const templatePath = path.join(__dirname, 'templates', 'typescript')

// Template files
// TODO this can be done in a loop perhaps
const schemasTypes: string = fs
	.readFileSync(path.join(templatePath, 'schemas/schemas.types.ts.hbs'))
	.toString()

const definitionBuilder: string = fs
	.readFileSync(path.join(templatePath, 'schemas/builder.ts.hbs'))
	.toString()

const definition: string = fs
	.readFileSync(path.join(templatePath, 'schemas/definition.ts.hbs'))
	.toString()

const schemaExample: string = fs
	.readFileSync(path.join(templatePath, 'schemas/example.ts.hbs'))
	.toString()

const error: string = fs
	.readFileSync(path.join(templatePath, 'errors/SpruceError.ts.hbs'))
	.toString()

const errorTypes: string = fs
	.readFileSync(path.join(templatePath, 'errors/error.types.ts.hbs'))
	.toString()

const errorOptionsTypes: string = fs
	.readFileSync(path.join(templatePath, 'errors/options.types.ts.hbs'))
	.toString()

const errorCode: string = fs
	.readFileSync(path.join(templatePath, 'errors/errorCode.ts.hbs'))
	.toString()

const errorDefinitionBuilder: string = fs
	.readFileSync(path.join(templatePath, 'errors/builder.ts.hbs'))
	.toString()

const errorExample: string = fs
	.readFileSync(path.join(templatePath, 'errors/example.ts.hbs'))
	.toString()

const test: string = fs
	.readFileSync(path.join(templatePath, 'tests/Test.test.ts.hbs'))
	.toString()

const autoloader: string = fs
	.readFileSync(path.join(templatePath, 'autoloader/autoloader.ts.hbs'))
	.toString()

const fieldsTypes: string = fs
	.readFileSync(path.join(templatePath, 'schemas/fields/fields.types.ts.hbs'))
	.toString()

const fieldClassMap: string = fs
	.readFileSync(path.join(templatePath, 'schemas/fields/fieldClassMap.ts.hbs'))
	.toString()

const fieldTypeEnum: string = fs
	.readFileSync(path.join(templatePath, 'schemas/fields/fieldTypeEnum.ts.hbs'))
	.toString()

const valueTypes: string = fs
	.readFileSync(path.join(templatePath, 'schemas/valueTypes.ts.hbs'))
	.toString()

// Template generators
export const templates = {
	/** All definitions */
	schemasTypes(options: {
		schemaTemplateItems: ISchemaTemplateItem[]
		fieldTemplateItems: IFieldTemplateItem[]
		valueTypes: IValueTypes
	}) {
		const imports = importExtractorUtil.extract(options.fieldTemplateItems)
		const template = handlebars.compile(schemasTypes)
		return template({ ...options, imports })
	},

	valueTypes(options: {
		schemaTemplateItems: ISchemaTemplateItem[]
		fieldTemplateItems: IFieldTemplateItem[]
	}) {
		const imports = importExtractorUtil.extract(options.fieldTemplateItems)
		const rendersAs = Object.values(TemplateRenderAs)

		const schemaTemplatesByNamespaceAndName = templateItemUtil.groupSchemaTemplatesByNamespaceAndName(
			options.schemaTemplateItems
		)

		const fieldTemplatesByType = templateItemUtil.groupFieldItemsByNamespace(
			options.fieldTemplateItems
		)

		const template = handlebars.compile(valueTypes)

		return template({
			...options,
			imports,
			fieldTemplatesByType,
			schemaTemplatesByNamespaceAndName,
			rendersAs
		})
	},
	/** Will return the template for a definition that has been normalized */
	definition(
		options: ISchemaTemplateItem & {
			schemaTemplateItems: ISchemaTemplateItem[]
			fieldTemplateItems: IFieldTemplateItem[]
			valueTypes: IValueTypes
		}
	) {
		const imports = importExtractorUtil.extract(options.fieldTemplateItems)
		const template = handlebars.compile(definition)
		return template({ ...options, imports })
	},

	/** When building a definition in a skill */
	definitionBuilder(options: IDefinitionBuilderTemplateItem) {
		const template = handlebars.compile(definitionBuilder)
		return template(options)
	},

	/** For creating an error class */
	error(options: IErrorOptions) {
		const template = handlebars.compile(error)
		return template({ renderClassDefinition: true, ...options })
	},

	/** For generating types file this error (the ISpruceErrorOptions sub-interface) */
	errorTypes(
		options: {
			schemaTemplateItems: ISchemaTemplateItem[]
			relativeToDefinition: string
		} & IErrorTemplateItem
	) {
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
	errorCode(options: { codes: IErrorTemplateItem[] }) {
		const template = handlebars.compile(errorCode)
		return template(options)
	},

	/** An error definition file */
	errorDefinitionBuilder(options: {
		nameCamel: string
		nameReadable: string
		description: string
	}) {
		const template = handlebars.compile(errorDefinitionBuilder)
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
	fieldTypeEnum(options: { fieldTemplateItems: IFieldTemplateItem[] }) {
		const template = handlebars.compile(fieldTypeEnum)
		return template(options)
	},

	/** Copy an entire directory and pass a context for all files */
	async directoryTemplate<K extends DirectoryTemplateKind>(options: {
		kind: K
		context: IDirectoryTemplateContextMap[K]
	}): Promise<IDirectoryTemplateFile[]> {
		return DirectoryTemplateUtility.build(options)
	},

	/** Tries our best to see if a specific directory is based on a valid directory template */
	async isValidTemplatedDirectory(options: {
		kind: DirectoryTemplateKind
		dir: string
	}) {
		const { kind, dir } = options
		// on a template, just check for package.json
		if (kind === DirectoryTemplateKind.Skill) {
			return fs.existsSync(path.join(dir, 'package.json'))
		}

		const filesToCheck = await DirectoryTemplateUtility.filesInTemplate(kind)
		// Check if the .spruce directory exists
		let filesMissing = false
		for (let i = 0; i < filesToCheck.length; i += 1) {
			const file = path.join(dir, filesToCheck[i])
			if (!fs.existsSync(file)) {
				log.debug(
					`[${kind}] containsAllTemplateFiles failed because ${file} is missing`
				)
				filesMissing = true
				break
			}
		}

		if (!filesMissing) {
			return true
		}

		return false
	},
	/** For generating cache keys against a schema field  */
	generateFieldKey(renderAs: TemplateRenderAs, definition: FieldDefinition) {
		return KeyGeneratorUtility.generateFieldKey(renderAs, definition)
	}
}

/** All the templates */
export type Templates = typeof templates
export { default as importExtractor } from './utilities/importExtractor.utility'

export default handlebars
export * from './types/templates.types'
