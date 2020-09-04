import fs from 'fs'
import path from 'path'
import {
	ISchema,
	ISchemaTemplateItem,
	IFieldTemplateItem,
} from '@sprucelabs/schema'
import { TemplateRenderAs } from '@sprucelabs/schema'
import { addonUtil } from '@sprucelabs/spruce-skill-utils'
import handlebars from 'handlebars'
import { FieldDefinition } from '#spruce/schemas/fields/fields.types'
import {
	SCHEMA_VERSION_FALLBACK,
	DEFAULT_NAMESPACE_PREFIX,
	DEFAULT_BUILDER_FUNCTION,
	DEFAULT_TYPES_FILE,
} from './constants'
import log from './singletons/log'
import {
	IAutoLoaderTemplateItem,
	DirectoryTemplateCode,
	IDirectoryTemplateContextMap,
	IValueTypes,
	ISchemaBuilderTemplateItem,
	IErrorOptions,
	IErrorTemplateItem,
	ITestOptions,
	IEventListenerOptions,
} from './types/templates.types'
import DirectoryTemplateUtility from './utilities/DirectoryTemplateUtility'
import importExtractorUtil from './utilities/importExtractor.utility'
import KeyGeneratorUtility from './utilities/KeyGeneratorUtility'
import templateImportUtil from './utilities/templateImporter.utility'
import templateItemUtil from './utilities/templateItem.utility'

addonUtil.import(__dirname, 'addons')

export const templates = {
	schemasTypes(options: {
		schemaTemplateItems: ISchemaTemplateItem[]
		fieldTemplateItems: IFieldTemplateItem[]
		valueTypes: IValueTypes
		globalNamespace?: string
	}) {
		const imports = importExtractorUtil.extract(options.fieldTemplateItems)
		const template = templateImportUtil.getTemplate(
			'schemas/schemas.types.ts.hbs'
		)
		return template({
			...options,
			imports,
			globalNamespace: options.globalNamespace ?? DEFAULT_NAMESPACE_PREFIX,
		})
	},

	valueTypes(options: {
		schemaTemplateItems: ISchemaTemplateItem[]
		fieldTemplateItems: IFieldTemplateItem[]
		globalNamespace?: string
	}) {
		const imports = importExtractorUtil.extract(options.fieldTemplateItems)
		const rendersAs = Object.values(TemplateRenderAs)

		const schemaTemplatesByNamespaceAndName = templateItemUtil.groupSchemaTemplatesByNamespaceAndName(
			options.schemaTemplateItems
		)

		const fieldTemplatesByType = templateItemUtil.groupFieldItemsByNamespace(
			options.fieldTemplateItems
		)

		const template = templateImportUtil.getTemplate('schemas/valueTypes.ts.hbs')

		return template({
			...options,
			imports,
			fieldTemplatesByType,
			schemaTemplatesByNamespaceAndName,
			SCHEMA_VERSION_FALLBACK,
			rendersAs,
			globalNamespace: options.globalNamespace ?? DEFAULT_NAMESPACE_PREFIX,
		})
	},

	schema(
		options: ISchemaTemplateItem & {
			schemaTemplateItems: ISchemaTemplateItem[]
			fieldTemplateItems: IFieldTemplateItem[]
			valueTypes: IValueTypes
			globalNamespace?: string
			typesFile?: string
		}
	) {
		debugger
		const imports = importExtractorUtil.extract(options.fieldTemplateItems)
		const template = templateImportUtil.getTemplate('schemas/schema.ts.hbs')
		return template({
			...options,
			imports,
			globalNamespace: options.globalNamespace ?? DEFAULT_NAMESPACE_PREFIX,
			typesFile: options.typesFile ?? DEFAULT_TYPES_FILE,
		})
	},

	schemaBuilder(options: ISchemaBuilderTemplateItem) {
		const template = templateImportUtil.getTemplate('schemas/builder.ts.hbs')
		return template({
			...options,
			builderFunction: options.builderFunction ?? DEFAULT_BUILDER_FUNCTION,
		})
	},

	/** For creating an error class */
	error(options: IErrorOptions) {
		const template = templateImportUtil.getTemplate('errors/SpruceError.ts.hbs')
		return template({ renderClassDefinition: true, ...options })
	},

	/** For generating types file this error (the ISpruceErrorOptions sub-interface) */
	errorTypes(
		options: {
			schemaTemplateItems: ISchemaTemplateItem[]
			relativeToSchema: string
		} & IErrorTemplateItem
	) {
		const template = templateImportUtil.getTemplate('errors/error.types.ts.hbs')
		return template(options)
	},

	/** For generating types for all the options (the ISpruceErrorOptions sub-interface) */
	errorOptionsTypes(options: {
		options: { nameCamel: string; namePascal: string }[]
	}) {
		const template = templateImportUtil.getTemplate(
			'errors/options.types.ts.hbs'
		)
		return template(options)
	},

	/** Schema example */
	schemaExample(options: {
		nameCamel: string
		namePascal: string
		definition: ISchema
	}) {
		const template = templateImportUtil.getTemplate('schemas/example.ts.hbs')
		return template(options)
	},

	/** Error example */
	errorExample(options: {
		nameCamel: string
		namePascal: string
		definition: ISchema
	}) {
		const template = templateImportUtil.getTemplate('errors/example.ts.hbs')
		return template(options)
	},

	/** Test file */
	test(options: ITestOptions) {
		const template = templateImportUtil.getTemplate('tests/Test.test.ts.hbs')
		return template(options)
	},

	/** Autoloader */
	autoloader(options: IAutoLoaderTemplateItem) {
		const template = templateImportUtil.getTemplate(
			'autoloader/autoloader.ts.hbs'
		)
		return template(options)
	},

	/** The types file for all the schema fields being used */
	fieldsTypes(options: { fieldTemplateItems: IFieldTemplateItem[] }) {
		const template = templateImportUtil.getTemplate(
			'schemas/fields/fields.types.ts.hbs'
		)
		return template(options)
	},
	/** Global mapping of all fields for lookup by type */
	fieldClassMap(options: { fieldTemplateItems: IFieldTemplateItem[] }) {
		const template = templateImportUtil.getTemplate(
			'schemas/fields/fieldClassMap.ts.hbs'
		)
		return template(options)
	},

	/** The field type enum */
	fieldTypeEnum(options: { fieldTemplateItems: IFieldTemplateItem[] }) {
		const template = templateImportUtil.getTemplate(
			'schemas/fields/fieldTypeEnum.ts.hbs'
		)
		return template(options)
	},

	listener(options: IEventListenerOptions) {
		const template = templateImportUtil.getTemplate('events/listener.ts.hbs')
		return template(options)
	},

	/** Copy an entire directory and pass a context for all files */
	async directoryTemplate<K extends DirectoryTemplateCode>(options: {
		kind: K
		context: IDirectoryTemplateContextMap[K]
	}) {
		return DirectoryTemplateUtility.build(options)
	},

	/** Tries our best to see if a specific directory is based on a valid directory template */
	async isValidTemplatedDirectory(options: {
		kind: DirectoryTemplateCode
		dir: string
	}) {
		const { kind, dir } = options
		// on a template, just check for package.json
		if (kind === DirectoryTemplateCode.Skill) {
			return fs.existsSync(path.join(dir, 'package.json'))
		}

		const filesToCheck = await DirectoryTemplateUtility.filesInTemplate(kind)
		// Check if the .spruce directory exists
		let filesMissing = false
		for (let i = 0; i < filesToCheck.length; i += 1) {
			const file = filesToCheck[i].path

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
	},
}

/** All the templates */
export type Templates = typeof templates
export { default as importExtractor } from './utilities/importExtractor.utility'

export default handlebars
export * from './types/templates.types'
export * from './constants'
