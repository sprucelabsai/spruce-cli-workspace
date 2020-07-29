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
	private definitionCache: Record<string, ISchema> = {}

	public generateTemplateItems(
		namespace: string,
		definitions: ISchema[]
	): ISchemaTemplateItem[] {
		this.definitionCache = {}
		this.cacheDefinitions(definitions)

		const flattened = this.flattenDefinitions(
			definitions.sort((a, b) => {
				return `${a.id}${a.version}`.localeCompare(`${b.id}${b.version}`)
			})
		)

		const templateTimes = flattened.map((def) =>
			this.buildTemplateItem(namespace, def)
		)
		return templateTimes
	}

	private cacheDefinitions(definitions: ISchema[]) {
		definitions.forEach((def) => {
			this.cacheDefinition(def)
		})
	}

	private cacheDefinition(def: ISchema) {
		this.definitionCache[schemaUtil.generateCacheKey(def)] = def
	}

	private cacheLookup(def: { id: string; version?: string }) {
		return this.definitionCache[schemaUtil.generateCacheKey(def)]
	}

	private flattenDefinitions(definitions: ISchema[]) {
		const flattened: ISchema[] = []

		definitions.forEach((d) => {
			const related = this.pullRelatedDefinitions(d)
			flattened.push(...related)
			flattened.push(d)
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
			const schema = this.definitionOrIdsWithVersionToSchema(item)

			related.push(schema)
		})

		return related
	}

	private definitionOrIdsWithVersionToSchema(
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

			this.cacheDefinition(schemaOrIdWithVersion)

			schema = schemaOrIdWithVersion
		}
		return schema
	}

	public buildTemplateItem(
		namespace: string,
		schema: ISchema
	): ISchemaTemplateItem {
		return {
			id: schema.id,
			namespace,
			schema: this.normalizeSchemaFieldsToIdsWithVersion(schema),
			...schemaUtil.generateNamesForDefinition(schema),
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
