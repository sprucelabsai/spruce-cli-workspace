import {
	ISchema,
	ISchemaTemplateItem,
	SchemaField,
	ISchemaFieldDefinition,
	ISchemaIdWithVersion,
	SchemaError,
	validateSchema,
	isIdWithVersion,
} from '@sprucelabs/schema'
import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'
import uniqWith from 'lodash/uniqWith'
import SpruceError from '../errors/SpruceError'
import { ISchemasByNamespace } from '../stores/SchemaStore'
import schemaUtil from '../utilities/schema.utility'

export default class SchemaTemplateItemBuilder {
	private schemaCache: Record<string, ISchema> = {}
	private localNamespace: string

	public constructor(localNamespace: string) {
		this.localNamespace = localNamespace
	}

	public generateTemplateItems(
		schemasByNamespace: ISchemasByNamespace,
		destinationDir: string
	) {
		const schemaTemplateItems: ISchemaTemplateItem[] = []
		const namespaces = Object.keys(schemasByNamespace)

		for (const namespace of namespaces) {
			const schemas = schemasByNamespace[namespace]
			const items = this.generateTemplateItemsForNamespace(
				namespace,
				cloneDeep(schemas),
				destinationDir
			)

			schemaTemplateItems.push(...items)
		}
		return schemaTemplateItems
	}

	private generateTemplateItemsForNamespace(
		namespace: string,
		schemas: ISchema[],
		destinationDir: string
	): ISchemaTemplateItem[] {
		this.schemaCache = {}

		this.cacheSchemas(schemas)

		const flattened = Object.values(this.schemaCache)

		const sorted: ISchema[] = []

		flattened.forEach((schema) => {
			const related = this.pullRelatedSchemas(schema)
			sorted.push(...related)
			sorted.push(schema)
		})

		let ourNamespace = sorted.filter(
			(s) => !s.namespace || s.namespace === namespace
		)

		ourNamespace = uniqWith(
			ourNamespace,
			(d1, d2) =>
				schemaUtil.generateCacheKey(d1) === schemaUtil.generateCacheKey(d2)
		)

		const templateTimes = ourNamespace.map((schema) =>
			this.buildTemplateItem({
				namespace,
				schema,
				isNested: !schemas.find((s) => s.id === schema.id),
				destinationDir,
			})
		)

		return templateTimes
	}

	private cacheSchemas(schemas: ISchema[]) {
		schemas.forEach((def) => {
			this.cacheSchema(def)
		})
	}

	private cacheSchema(schema: ISchema) {
		const fields = schema.dynamicFieldSignature
			? { dynamicField: schema.dynamicFieldSignature }
			: schema.fields ?? {}

		Object.keys(fields).forEach((name) => {
			const field = fields[name]
			if (field.type === 'schema') {
				const schemasOrIdsWithVersion = SchemaField.mapFieldDefinitionToSchemasOrIdsWithVersion(
					field
				)

				delete field.options.schema
				delete field.options.schemaId
				delete field.options.schemaIds
				delete field.options.schemas
				field.options.schemas = []

				schemasOrIdsWithVersion.forEach((schemaOrId) => {
					const related = { version: schema.version, ...schemaOrId }
					field.options.schemas?.push(related)
					this.cacheSchema(related)
				})
			}
		})

		const key = schemaUtil.generateCacheKey(schema)
		this.schemaCache[key] = merge(
			this.schemaCache[key] ?? {},
			this.normalizeSchemaFieldsToIdsWithVersion(schema)
		)
	}

	private cacheLookup(schema: { id: string; version?: string }) {
		return this.schemaCache[schemaUtil.generateCacheKey(schema)]
	}

	private pullRelatedSchemas(definition: ISchema) {
		const related: ISchema[] = []

		let fields: Record<string, any> | undefined
		if (definition.dynamicFieldSignature) {
			fields = { dynamicField: definition.dynamicFieldSignature }
		} else {
			fields = definition.fields
		}

		Object.keys(fields ?? {}).forEach((fieldName: string) => {
			//@ts-ignore
			const field = fields[fieldName]

			if (field?.type === 'schema') {
				try {
					related.push(...this.pullRelatedFromSchemaField(field))
				} catch (err) {
					throw new SpruceError({
						code: 'GENERIC',
						friendlyMessage: `Failed to load related schema for ${definition.id}.${definition.version}.${fieldName}`,
						originalError: err,
					})
				}
			}
		})

		return related
	}

	private pullRelatedFromSchemaField(field: ISchemaFieldDefinition) {
		const related: ISchema[] = []
		const schemasOrIdsWithVersion = SchemaField.mapFieldDefinitionToSchemasOrIdsWithVersion(
			field
		)
		schemasOrIdsWithVersion.forEach((item) => {
			const schema = this.schemaOrIdsWithVersionToSchema(item)
			related.push(schema)
		})

		return related
	}

	private schemaOrIdsWithVersionToSchema(
		schemaOrIdWithVersion: ISchema | ISchemaIdWithVersion
	) {
		let schema: ISchema | undefined
		if (isIdWithVersion(schemaOrIdWithVersion)) {
			schema = this.cacheLookup(schemaOrIdWithVersion)

			if (!schema) {
				throw new SchemaError({
					code: 'SCHEMA_NOT_FOUND',
					schemaId: JSON.stringify(schemaOrIdWithVersion),
					friendlyMessage: 'Make sure you are pointing to the correct version.',
				})
			}
		} else {
			validateSchema(schemaOrIdWithVersion)

			schema = schemaOrIdWithVersion
		}
		return schema
	}

	private buildTemplateItem(options: {
		namespace: string
		schema: ISchema
		isNested: boolean
		destinationDir: string
	}): ISchemaTemplateItem {
		const { schema, namespace, isNested, destinationDir } = options

		const item: ISchemaTemplateItem = {
			id: schema.id,
			namespace,
			schema,
			...schemaUtil.generateNamesForSchema(schema),
			isNested,
			destinationDir,
		}

		if (
			namespace.toLowerCase() === this.localNamespace.toLowerCase() &&
			schema.importsWhenLocal
		) {
			item.imports = schema.importsWhenLocal
		} else if (
			namespace.toLowerCase() !== this.localNamespace.toLowerCase() &&
			schema.importsWhenRemote
		) {
			item.imports = schema.importsWhenRemote
		}

		return item
	}

	private normalizeSchemaFieldsToIdsWithVersion(schema: ISchema): ISchema {
		const normalized: ISchema = cloneDeep(schema)

		let fields: Record<string, any> | undefined
		if (normalized.dynamicFieldSignature) {
			fields = { dynamicField: normalized.dynamicFieldSignature }
		} else {
			fields = normalized.fields
		}

		Object.keys(fields ?? {}).forEach((name) => {
			//@ts-ignore
			const field = fields[name]
			if (field && field.type === 'schema') {
				const idsWithVersion = SchemaField.mapFieldDefinitionToSchemaIdsWithVersion(
					field
				)
				delete field.options.schema
				delete field.options.schemaId
				delete field.options.schemaIds
				delete field.options.schemas
				delete field.options.schemasCallback

				field.options.schemaIds = idsWithVersion
			}
		})

		if (normalized.dynamicFieldSignature) {
			normalized.dynamicFieldSignature = fields?.dynamicField
		} else {
			normalized.fields = fields
		}

		return normalized
	}
}
