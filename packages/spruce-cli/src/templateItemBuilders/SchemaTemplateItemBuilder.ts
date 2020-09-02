import SchemaEntity, {
	ISchema,
	ISchemaTemplateItem,
	SchemaField,
	ISchemaFieldDefinition,
	ISchemaIdWithVersion,
	SchemaError,
} from '@sprucelabs/schema'
import cloneDeep from 'lodash/cloneDeep'
import uniqWith from 'lodash/uniqWith'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import SpruceError from '../errors/SpruceError'
import schemaUtil, { SchemaRelationshipType } from '../utilities/schema.utility'

export default class SchemaTemplateItemBuilder {
	private schemaCache: Record<string, ISchema> = {}

	public generateTemplateItems(
		namespace: string,
		schemas: ISchema[]
	): ISchemaTemplateItem[] {
		this.schemaCache = {}
		this.cacheSchemas(schemas)

		const versionedSchemas = this.versionNestedSchemasForSchemas(schemas)
		const flattened = this.flattenSchemas(
			versionedSchemas.sort((a, b) => {
				return `${a.id}${a.version}`.localeCompare(`${b.id}${b.version}`)
			})
		)

		const templateTimes = flattened.map((schema) =>
			this.buildTemplateItem(
				namespace,
				schema,
				!schemas.find((s) => s.id === schema.id)
			)
		)
		return templateTimes
	}

	private versionNestedSchemasForSchemas(schemas: ISchema[]) {
		let versions: ISchema[] = []
		for (const schema of schemas) {
			versions.push(this.versionNestedSchemas(schema))
		}

		return versions
	}

	private versionNestedSchemas(schema: ISchema) {
		if (!schema.version) {
			return schema
		}

		const normalized: ISchema = cloneDeep(schema)

		let fields: Record<string, any> | undefined
		if (normalized.dynamicKeySignature) {
			fields = { dynamicField: normalized.dynamicKeySignature }
		} else {
			fields = normalized.fields
		}

		Object.keys(fields ?? {}).forEach((name) => {
			//@ts-ignore
			const field = fields[name]
			if (field.type === FieldType.Schema) {
				this.dropInVersionIfMissing(field, normalized)
			}
		})

		if (normalized.dynamicKeySignature) {
			normalized.dynamicKeySignature = fields?.dynamicField
		} else {
			normalized.fields = fields
		}

		return normalized
	}

	private dropInVersionIfMissing(
		field: ISchemaFieldDefinition,
		normalized: ISchema
	) {
		let schemas: (ISchema | ISchemaIdWithVersion)[] = []
		if (field.options.schema) {
			schemas.push(field.options.schema)
		}
		if (field.options.schemas) {
			schemas.push(...field.options.schemas)
		}
		for (const schema of schemas) {
			if (
				schemaUtil.relationshipType(schema) ===
					SchemaRelationshipType.Definition &&
				!schema.version
			) {
				schema.version = normalized.version
			}
		}
	}

	private cacheSchemas(schemas: ISchema[]) {
		schemas.forEach((def) => {
			this.cacheSchema(def)
		})
	}

	private cacheSchema(schema: ISchema) {
		this.schemaCache[schemaUtil.generateCacheKey(schema)] = schema
	}

	private cacheLookup(schema: { id: string; version?: string }) {
		return this.schemaCache[schemaUtil.generateCacheKey(schema)]
	}

	private flattenSchemas(schemas: ISchema[]) {
		const flattened: ISchema[] = []

		schemas.forEach((schema) => {
			const related = this.pullRelatedDefinitions(schema)
			flattened.push(...related)
			flattened.push(schema)
		})

		return uniqWith(
			flattened,
			(d1, d2) =>
				schemaUtil.generateCacheKey(d1) === schemaUtil.generateCacheKey(d2)
		)
	}

	private pullRelatedDefinitions(definition: ISchema) {
		const related: ISchema[] = []

		let fields: Record<string, any> | undefined
		if (definition.dynamicKeySignature) {
			fields = { dynamicField: definition.dynamicKeySignature }
		} else {
			fields = definition.fields
		}

		Object.keys(fields ?? {}).forEach((fieldName: string) => {
			//@ts-ignore
			const field = fields[fieldName]

			if (field?.type === FieldType.Schema) {
				try {
					related.push(...this.pullRelatedFromSchemaField(field))
				} catch (err) {
					throw new SpruceError({
						code: 'GENERIC',
						friendlyMessage: `Failed to load related schema for ${definition.id}${definition.version}.${fieldName}`,
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
		if (
			schemaUtil.relationshipType(schemaOrIdWithVersion) ===
			SchemaRelationshipType.IdWithVersion
		) {
			schema = this.cacheLookup(schemaOrIdWithVersion)
			if (!schema) {
				throw new SchemaError({
					code: 'SCHEMA_NOT_FOUND',
					schemaId: JSON.stringify(schemaOrIdWithVersion),
					friendlyMessage: 'Make sure you are pointing to the correct version.',
				})
			}
		} else {
			SchemaEntity.validateSchema(schemaOrIdWithVersion)

			this.cacheSchema(schemaOrIdWithVersion)

			schema = schemaOrIdWithVersion
		}
		return schema
	}

	private buildTemplateItem(
		namespace: string,
		schema: ISchema,
		isNested: boolean
	): ISchemaTemplateItem {
		return {
			id: schema.id,
			namespace,
			schema: this.normalizeSchemaFieldsToIdsWithVersion(schema),
			...schemaUtil.generateNamesForSchema(schema),
			isNested,
		}
	}

	private normalizeSchemaFieldsToIdsWithVersion(schema: ISchema): ISchema {
		const normalized: ISchema = cloneDeep(schema)

		let fields: Record<string, any> | undefined
		if (normalized.dynamicKeySignature) {
			fields = { dynamicField: normalized.dynamicKeySignature }
		} else {
			fields = normalized.fields
		}

		Object.keys(fields ?? {}).forEach((name) => {
			//@ts-ignore
			const field = fields[name]
			if (field && field.type === FieldType.Schema) {
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

		if (normalized.dynamicKeySignature) {
			normalized.dynamicKeySignature = fields?.dynamicField
		} else {
			normalized.fields = fields
		}

		return normalized
	}
}
