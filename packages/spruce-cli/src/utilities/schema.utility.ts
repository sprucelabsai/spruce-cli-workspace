import { ISchema, ISchemaIdWithVersion } from '@sprucelabs/schema'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'

export enum SchemaRelationshipType {
	IdWithVersion,
	Definition,
}

const schemaUtil = {
	generateNamesForSchema(definition: ISchema) {
		return {
			nameReadable: definition.name,
			nameCamel: namesUtil.toCamel(definition.id),
			namePascal: namesUtil.toPascal(definition.id),
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
