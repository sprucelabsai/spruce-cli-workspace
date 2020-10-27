import fs from 'fs'
import path from 'path'
import {
	ISchema,
	ISchemaTemplateItem,
	IFieldTemplateItem,
} from '@sprucelabs/schema'
import { TemplateRenderAs } from '@sprucelabs/schema'
import {
	addonUtil,
	SCHEMA_VERSION_FALLBACK,
	DEFAULT_NAMESPACE_PREFIX,
	DEFAULT_BUILDER_FUNCTION,
	DEFAULT_TYPES_FILE,
} from '@sprucelabs/spruce-skill-utils'
import handlebars from 'handlebars'
import { FieldDefinition } from '#spruce/schemas/fields/fields.types'
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

addonUtil.importSync({}, __dirname, 'addons')

export const templates = {
	schemasTypes(options: {
		schemaTemplateItems: ISchemaTemplateItem[]
		fieldTemplateItems: IFieldTemplateItem[]
		valueTypes: IValueTypes
		globalNamespace?: string
		typesTemplate?: string
	}) {
		const imports = importExtractorUtil.extract(options.fieldTemplateItems)
		const template = templateImportUtil.getTemplate(
			options.typesTemplate ?? 'schemas/schemas.types.ts.hbs'
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
			registerBuiltSchemas: boolean
			schemaFile?: string
			typesFile?: string
		}
	) {
		const imports = importExtractorUtil.extract(options.fieldTemplateItems)
		const template = templateImportUtil.getTemplate(
			options.schemaFile ?? 'schemas/schema.ts.hbs'
		)
		return template({
			...options,
			imports,
			registerBuiltSchemas: options.registerBuiltSchemas,
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

	error(options: IErrorOptions) {
		const template = templateImportUtil.getTemplate('errors/SpruceError.ts.hbs')
		return template({ renderClassDefinition: true, ...options })
	},

	errorOptionsTypes(options: { options: IErrorTemplateItem[] }) {
		const template = templateImportUtil.getTemplate(
			'errors/options.types.ts.hbs'
		)
		return template(options)
	},

	schemaExample(options: {
		nameCamel: string
		namePascal: string
		definition: ISchema
	}) {
		const template = templateImportUtil.getTemplate('schemas/example.ts.hbs')
		return template(options)
	},

	schemaPlugin() {
		const template = templateImportUtil.getTemplate(
			'schemas/schema.plugin.ts.hbs'
		)
		return template({})
	},

	errorExample(options: {
		nameCamel: string
		namePascal: string
		definition: ISchema
	}) {
		const template = templateImportUtil.getTemplate('errors/example.ts.hbs')
		return template(options)
	},

	test(options: ITestOptions) {
		const template = templateImportUtil.getTemplate('tests/Test.test.ts.hbs')
		return template(options)
	},

	autoloader(options: IAutoLoaderTemplateItem) {
		const template = templateImportUtil.getTemplate(
			'autoloader/autoloader.ts.hbs'
		)
		return template(options)
	},

	fieldsTypes(options: { fieldTemplateItems: IFieldTemplateItem[] }) {
		const template = templateImportUtil.getTemplate(
			'schemas/fields/fields.types.ts.hbs'
		)
		return template(options)
	},
	fieldClassMap(options: { fieldTemplateItems: IFieldTemplateItem[] }) {
		const template = templateImportUtil.getTemplate(
			'schemas/fields/fieldClassMap.ts.hbs'
		)
		return template(options)
	},

	listener(options: IEventListenerOptions) {
		const template = templateImportUtil.getTemplate('events/listener.ts.hbs')
		return template(options)
	},

	async directoryTemplate<K extends DirectoryTemplateCode>(options: {
		kind: K
		context: IDirectoryTemplateContextMap[K]
	}) {
		return DirectoryTemplateUtility.build(options)
	},

	async isValidTemplatedDirectory(options: {
		kind: DirectoryTemplateCode
		dir: string
	}) {
		const { kind, dir } = options

		if (kind === DirectoryTemplateCode.Skill) {
			return fs.existsSync(path.join(dir, 'package.json'))
		}

		const filesToCheck = await DirectoryTemplateUtility.filesInTemplate(kind)

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

	generateFieldKey(renderAs: TemplateRenderAs, definition: FieldDefinition) {
		return KeyGeneratorUtility.generateFieldKey(renderAs, definition)
	},
}

/** All the templates */
export type Templates = typeof templates
export { default as importExtractor } from './utilities/importExtractor.utility'

export default handlebars
export * from './types/templates.types'
