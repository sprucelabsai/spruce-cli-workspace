import { ISchemaDefinition } from '@sprucelabs/schema'
import namesUtil from './names.utility'

const schemaUtil = {
	generateNamesForDefinition(definition: ISchemaDefinition) {
		return {
			nameReadable: definition.name,
			nameCamel: definition.id,
			namePascal: namesUtil.toPascal(definition.id)
		}
	}
}

export default schemaUtil
