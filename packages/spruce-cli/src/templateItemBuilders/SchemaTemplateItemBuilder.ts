import {
	Schema,
	SchemaTemplateItem,
	SchemaField,
	SchemaFieldFieldDefinition,
	SchemaIdWithVersion,
	SchemaError,
	validateSchema,
	isIdWithVersion,
	normalizeSchemaToIdWithVersion,
} from '@sprucelabs/schema'
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'
import merge from 'lodash/merge'
import uniqWith from 'lodash/uniqWith'
import SpruceError from '../errors/SpruceError'
import { SchemasByNamespace } from '../stores/SchemaStore'
import schemaUtil from '../utilities/schema.utility'

interface SchemaWithDependencies {
	schema: Schema
	dependencies: SchemaIdWithVersion[]
	isNested: boolean
}

export default class SchemaTemplateItemBuilder {
	private schemasByKey: Record<string, SchemaWithDependencies> = {}
	private localNamespace: string

	public constructor(localNamespace: string) {
		this.localNamespace = localNamespace
	}

	public buildTemplateItems(
		schemasByNamespace: SchemasByNamespace,
		destinationDir: string
	) {
		const schemas: Schema[] = []
		const namespaces = Object.keys(schemasByNamespace)

		for (const namespace of namespaces) {
			schemas.push(
				...schemasByNamespace[namespace].map((s) => ({ namespace, ...s }))
			)
		}

		this.flattenSchemas(schemas)

		const flattened = Object.values(this.schemasByKey)
		const sorted = flattened
			.sort((a, b) => {
				if (this.doesADependOnB(a, b)) {
					return -1
				} else if (this.doesADependOnB(b, a)) {
					return 1
				}
				return 0
			})
			.reverse()

		const schemaTemplateItems = sorted.map((s) =>
			this.buildTemplateItem({
				...s,
				destinationDir,
			})
		)

		return schemaTemplateItems
	}

	private doesADependOnB(a: SchemaWithDependencies, b: SchemaWithDependencies) {
		const { dependencies } = a
		const idWithVersion = normalizeSchemaToIdWithVersion(b.schema)

		if (dependencies.find((dep) => isEqual(dep, idWithVersion))) {
			return true
		}

		return false
	}

	private generateTemplateItemsForNamespace(
		namespace: string,
		schemas: Schema[],
		destinationDir: string
	): SchemaTemplateItem[] {
		this.schemasByKey = {}

		this.flattenSchemas(schemas)

		const flattened = Object.values(this.schemasByKey)

		const sorted: Schema[] = []

		flattened.forEach((schema) => {
			const related = this.pullRelatedSchemas(schema)
			sorted.push(...related)
			sorted.push(schema)
		})

		let ourNamespace = flattened

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

	private flattenSchemas(schemas: Schema[]) {
		schemas.forEach((def) => {
			this.flattenSchema(def)
		})
	}

	private flattenSchema(schema: Schema, isNested = false) {
		const localSchema = cloneDeep(schema)

		const fields = localSchema.dynamicFieldSignature
			? { dynamicField: localSchema.dynamicFieldSignature }
			: localSchema.fields ?? {}

		const dependencies: SchemaIdWithVersion[] = []

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
				field.options.schemaIds = []

				schemasOrIdsWithVersion.forEach((schemaOrId) => {
					const related = { ...schemaOrId }

					if (localSchema.version && !related.version) {
						related.version = localSchema.version
					}

					if (!related.namespace) {
						related.namespace = schema.namespace
					}

					const relatedIdWithVersion = normalizeSchemaToIdWithVersion(related)

					field.options.schemaIds?.push(relatedIdWithVersion)
					dependencies.push(relatedIdWithVersion)

					this.flattenSchema(related, true)
				})
			}
		})

		const key = schemaUtil.generateCacheKey(localSchema)
		this.schemasByKey[key] = merge(this.schemasByKey[key] ?? {}, {
			schema: localSchema,
			dependencies,
			isNested: this.schemasByKey[key]?.isNested === false ? false : isNested,
		})
	}

	private cacheLookup(schema: { id: string; version?: string }) {
		return this.schemasByKey[schemaUtil.generateCacheKey(schema)]
	}

	private pullRelatedSchemas(definition: Schema) {
		const related: Schema[] = []

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

	private pullRelatedFromSchemaField(field: SchemaFieldFieldDefinition) {
		const related: Schema[] = []
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
		schemaOrIdWithVersion: Schema | SchemaIdWithVersion
	) {
		let schema: Schema | undefined
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
		schema: Schema
		isNested: boolean
		destinationDir: string
	}): SchemaTemplateItem {
		const { schema, isNested, destinationDir } = options
		const namespace = schema.namespace ?? this.localNamespace

		const item: SchemaTemplateItem = {
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

	private normalizeSchemaFieldsToIdsWithVersion(schema: Schema): Schema {
		const normalized: Schema = cloneDeep(schema)

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
