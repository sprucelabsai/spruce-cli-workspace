import { ISchema } from '@sprucelabs/schema'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'

const schemaUtil = {
	generateNamesForSchema(schema: ISchema) {
		return {
			nameReadable: schema.name ?? schema.id,
			nameCamel: namesUtil.toCamel(schema.id),
			namePascal: namesUtil.toPascal(schema.id),
		}
	},

	generateCacheKey(options: { id: string; version?: string }) {
		return `${options.id}-${options.version}`
	},
}

export default schemaUtil
