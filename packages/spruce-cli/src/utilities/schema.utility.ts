import { ISchema, ISchemaIdWithVersion } from '@sprucelabs/schema'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'

export enum SchemaRelationshipType {
	IdWithVersion,
	Definition,
}

const schemaUtil = {
	generateNamesForSchema(schema: ISchema) {
		return {
			nameReadable: schema.name ?? schema.id,
			nameCamel: namesUtil.toCamel(schema.id),
			namePascal: namesUtil.toPascal(schema.id),
		}
	},

	relationshipType(
		item: ISchemaIdWithVersion | ISchema
	): SchemaRelationshipType {
		if ((item as ISchema).name) {
			return SchemaRelationshipType.Definition
		} else {
			return SchemaRelationshipType.IdWithVersion
		}
	},

	generateCacheKey(options: { id: string; version?: string }) {
		return `${options.id}-${options.version}`
	},
}

export default schemaUtil
