import fs from 'fs'
import path from 'path'
import {
	Schema,
	SchemaTemplateItem,
	FieldTemplateItem,
} from '@sprucelabs/schema'
import { TemplateRenderAs } from '@sprucelabs/schema'
import {
	addonUtil,
	SCHEMA_VERSION_FALLBACK,
	DEFAULT_GLOBAL_SCHEMA_NAMESPACE,
	DEFAULT_BUILDER_FUNCTION,
	DEFAULT_SCHEMA_TYPES_FILE,
} from '@sprucelabs/spruce-skill-utils'
import handlebars from 'handlebars'
import { FieldDefinitions } from '#spruce/schemas/fields/fields.types'
import log from './singletons/log'
import {
	DirectoryTemplateCode,
	DirectoryTemplateContextMap,
	ValueTypes,
	SchemaBuilderTemplateItem,
	ErrorOptions,
	ErrorTemplateItem,
	TestOptions,
	EventListenerOptions,
	EventContractTemplateItem,
	EventPayloadOptions,
} from './types/templates.types'
import DirectoryTemplateUtility from './utilities/DirectoryTemplateUtility'
import importExtractorUtil from './utilities/importExtractor.utility'
import KeyGeneratorUtility from './utilities/KeyGeneratorUtility'
import templateImportUtil from './utilities/templateImporter.utility'
import templateItemUtil from './utilities/templateItem.utility'

addonUtil.importSync({}, __dirname, 'addons')

export const templates = {
	schemasTypes(options: {
		schemaTemplateItems: SchemaTemplateItem[]
		fieldTemplateItems: FieldTemplateItem[]
		valueTypes: ValueTypes
		globalSchemaNamespace?: string
		typesTemplate?: string
	}) {
		const imports = importExtractorUtil.extract(options.fieldTemplateItems)
		const template = templateImportUtil.getTemplate(
			options.typesTemplate ?? 'schemas/schemas.types.ts.hbs'
		)

		return template({
			...options,
			imports,
			globalSchemaNamespace:
				options.globalSchemaNamespace ?? DEFAULT_GLOBAL_SCHEMA_NAMESPACE,
		})
	},

	valueTypes(options: {
		schemaTemplateItems: SchemaTemplateItem[]
		fieldTemplateItems: FieldTemplateItem[]
		globalSchemaNamespace?: string
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
			globalSchemaNamespace:
				options.globalSchemaNamespace ?? DEFAULT_GLOBAL_SCHEMA_NAMESPACE,
		})
	},

	schema(
		options: SchemaTemplateItem & {
			schemaTemplateItems: SchemaTemplateItem[]
			fieldTemplateItems: FieldTemplateItem[]
			valueTypes: ValueTypes
			globalSchemaNamespace?: string
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
			globalSchemaNamespace:
				options.globalSchemaNamespace ?? DEFAULT_GLOBAL_SCHEMA_NAMESPACE,
			typesFile: options.typesFile ?? DEFAULT_SCHEMA_TYPES_FILE,
		})
	},

	schemaBuilder(options: SchemaBuilderTemplateItem) {
		const template = templateImportUtil.getTemplate('schemas/builder.ts.hbs')
		return template({
			...options,
			builderFunction: options.builderFunction ?? DEFAULT_BUILDER_FUNCTION,
		})
	},

	error(options: ErrorOptions) {
		const template = templateImportUtil.getTemplate('errors/SpruceError.ts.hbs')
		return template({ renderClassDefinition: true, ...options })
	},

	errorOptionsTypes(options: { options: ErrorTemplateItem[] }) {
		const template = templateImportUtil.getTemplate(
			'errors/options.types.ts.hbs'
		)
		return template(options)
	},

	schemaExample(options: {
		nameCamel: string
		namePascal: string
		definition: Schema
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

	errorPlugin() {
		const template = templateImportUtil.getTemplate(
			'errors/error.plugin.ts.hbs'
		)
		return template({})
	},

	errorExample(options: {
		nameCamel: string
		namePascal: string
		definition: Schema
	}) {
		const template = templateImportUtil.getTemplate('errors/example.ts.hbs')
		return template(options)
	},

	test(options: TestOptions) {
		const template = templateImportUtil.getTemplate('tests/Test.test.ts.hbs')
		return template(options)
	},

	fieldsTypes(options: { fieldTemplateItems: FieldTemplateItem[] }) {
		const template = templateImportUtil.getTemplate(
			'schemas/fields/fields.types.ts.hbs'
		)
		return template(options)
	},

	fieldClassMap(options: { fieldTemplateItems: FieldTemplateItem[] }) {
		const template = templateImportUtil.getTemplate(
			'schemas/fields/fieldClassMap.ts.hbs'
		)
		return template(options)
	},

	launchConfig() {
		const template = templateImportUtil.getTemplate('vscode/launch.json')
		return template({})
	},

	vsCodeSettings() {
		const template = templateImportUtil.getTemplate('vscode/settings.json')
		return template({})
	},

	listener(options: EventListenerOptions) {
		const template = templateImportUtil.getTemplate('events/listener.ts.hbs')
		return template({
			globalSchemaNamespace: DEFAULT_GLOBAL_SCHEMA_NAMESPACE,
			...options,
		})
	},

	eventContract(
		options: EventContractTemplateItem & {
			schemaTemplateItems: SchemaTemplateItem[]
		}
	) {
		const template = templateImportUtil.getTemplate(
			'events/event.contract.ts.hbs'
		)

		return template(options)
	},

	eventEmitPayload(options: EventPayloadOptions) {
		const template = templateImportUtil.getTemplate(
			'events/payload.builder.ts.hbs'
		)

		return template({ ...options, actionCamel: 'Emit' })
	},

	eventResponsePayload(options: EventPayloadOptions) {
		const template = templateImportUtil.getTemplate(
			'events/payload.builder.ts.hbs'
		)

		return template({ ...options, actionCamel: 'Response' })
	},

	combinedEventsContract(contracts: EventContractTemplateItem[]) {
		const template = templateImportUtil.getTemplate(
			'events/events.contract.ts.hbs'
		)
		return template({ contracts })
	},

	async directoryTemplate<K extends DirectoryTemplateCode>(options: {
		kind: K
		context: DirectoryTemplateContextMap[K]
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

	generateFieldKey(renderAs: TemplateRenderAs, definition: FieldDefinitions) {
		return KeyGeneratorUtility.generateFieldKey(renderAs, definition)
	},
}

export type Templates = typeof templates
export { default as importExtractor } from './utilities/importExtractor.utility'

export default handlebars
export * from './types/templates.types'
