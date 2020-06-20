import Schema, {
	ISchemaDefinition,
	ISchemaTemplateNames
} from '@sprucelabs/schema'
import ErrorCode from '#spruce/errors/errorCode'
import SpruceError from '../errors/SpruceError'
import namesUtil from './names.utility'
import importsUtil from './imports.utility'
const schemaUtil = {
	buildNames(definition: ISchemaDefinition): ISchemaTemplateNames {
		return {
			namePascal: namesUtil.toPascal(definition.id),
			nameCamel: namesUtil.toCamel(definition.id),
			nameReadable: definition.name
		}
	},
	importDefinition: async (file: string, cwd: string) => {
		const definitionProxy = await importsUtil.importDefault(file, cwd)

		try {
			Schema.validateDefinition(definitionProxy)
		} catch (err) {
			throw new SpruceError({
				code: ErrorCode.DefinitionFailedToImport,
				file,
				originalError: err,
				friendlyMessage:
					'The definition imported is not valid. Make sure it is "export default build[Schema|Error|Field]Definition"'
			})
		}

		return definitionProxy
	}
}
export default schemaUtil
