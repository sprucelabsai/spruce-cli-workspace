import Schema, {
	ISchemaDefinition,
	ISchemaTemplateItem,
	SchemaField,
	ErrorCode as SchemaErrorCode,
	ISchemaFieldDefinition,
	ISchemaIdWithVersion,
	SchemaError,
} from '@sprucelabs/schema'
import cloneDeep from 'lodash/cloneDeep'
import uniqWith from 'lodash/uniqWith'
import ErrorCode from '#spruce/errors/errorCode'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import SpruceError from '../errors/SpruceError'
import schemaUtil, { SchemaRelationshipType } from '../utilities/schema.utility'

export default class SchemaTemplateItemBuilder {
	private definitionCache: Record<string, ISchemaDefinition> = {}

	public generateTemplateItems(
		namespace: string,
		definitions: ISchemaDefinition[]
	): ISchemaTemplateItem[] {
		this.definitionCache = {}
		this.cacheDefinitions(definitions)

		const flattened = this.flattenDefinitions(definitions)

		const templateTimes = flattened.map((def) =>
			this.buildTemplateItem(namespace, def)
		)
		return templateTimes
	}

	private cacheDefinitions(definitions: ISchemaDefinition[]) {
		definitions.forEach((def) => {
			this.cacheDefinition(def)
		})
	}

	private cacheDefinition(def: ISchemaDefinition) {
		this.definitionCache[schemaUtil.generateCacheKey(def)] = def
	}

	private cacheLookup(def: { id: string; version?: string }) {
		return this.definitionCache[schemaUtil.generateCacheKey(def)]
	}

	private flattenDefinitions(definitions: ISchemaDefinition[]) {
		const flattened: ISchemaDefinition[] = []

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

	private pullRelatedDefinitions(definition: ISchemaDefinition) {
		const related: ISchemaDefinition[] = []

		Object.keys(definition.fields ?? {}).forEach((fieldName) => {
			const field = definition.fields?.[fieldName]

			if (field?.type === FieldType.Schema) {
				try {
					related.push(...this.pullRelatedFromSchemaField(field))
				} catch (err) {
					throw new SpruceError({
						code: ErrorCode.Generic,
						friendlyMessage: `Failed to load related schema for ${definition.id}${definition.version}.${fieldName}`,
						originalError: err,
					})
				}
			}
		})

		return related
	}

	private pullRelatedFromSchemaField(field: ISchemaFieldDefinition) {
		const related: ISchemaDefinition[] = []
		const schemasOrIdsWithVersion = SchemaField.mapFieldDefinitionToSchemasOrIdsWithVersion(
			field
		)
		schemasOrIdsWithVersion.forEach((item) => {
			const definition = this.definitionOrIdsWithVersionToDefinition(item)

			related.push(definition)
		})

		return related
	}

	private definitionOrIdsWithVersionToDefinition(
		definitionOrIdWithVersion: ISchemaDefinition | ISchemaIdWithVersion
	) {
		let definition: ISchemaDefinition | undefined
		if (
			schemaUtil.relationshipType(definitionOrIdWithVersion) ===
			SchemaRelationshipType.IdWithVersion
		) {
			definition = this.cacheLookup(definitionOrIdWithVersion)
			if (!definition) {
				throw new SchemaError({
					code: SchemaErrorCode.SchemaNotFound,
					schemaId: JSON.stringify(definitionOrIdWithVersion),
					friendlyMessage: 'Make sure you are pointing to the correct version.',
				})
			}
		} else {
			Schema.validateDefinition(definitionOrIdWithVersion)

			this.cacheDefinition(definitionOrIdWithVersion)

			definition = definitionOrIdWithVersion
		}
		return definition
	}

	public buildTemplateItem(
		namespace: string,
		definition: ISchemaDefinition
	): ISchemaTemplateItem {
		return {
			id: definition.id,
			namespace,
			definition: this.normalizeSchemaFieldsToIdsWithVersion(definition),
			...schemaUtil.generateNamesForDefinition(definition),
		}
	}

	private normalizeSchemaFieldsToIdsWithVersion(
		definition: ISchemaDefinition
	): ISchemaDefinition {
		const normalized: ISchemaDefinition = cloneDeep(definition)

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
