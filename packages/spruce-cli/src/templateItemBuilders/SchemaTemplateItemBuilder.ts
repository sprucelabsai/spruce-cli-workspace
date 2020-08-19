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

		const flattened = this.flattenSchemas(
			schemas.sort((a, b) => {
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

		Object.keys(definition.fields ?? {}).forEach((fieldName) => {
			const field = definition.fields?.[fieldName]

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

		Object.keys(normalized.fields ?? {}).forEach((name) => {
			const field = normalized.fields?.[name]
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

		return normalized
	}
}
