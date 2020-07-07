import { ISchemaDefinition, ISchemaIdWithVersion } from '@sprucelabs/schema'
import namesUtil from './names.utility'

export enum SchemaRelationshipType {
	IdWithVersion,
	Definition,
}

const schemaUtil = {
	generateNamesForDefinition(definition: ISchemaDefinition) {
		return {
			nameReadable: definition.name,
			nameCamel: definition.id,
			namePascal: namesUtil.toPascal(definition.id),
		}
	},

	relationshipType(
		item: ISchemaIdWithVersion | ISchemaDefinition
	): SchemaRelationshipType {
		if ((item as ISchemaDefinition).name) {
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
