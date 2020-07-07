import Schema from '@sprucelabs/schema'
import ErrorCode from '#spruce/errors/errorCode'
import SpruceError from '../errors/SpruceError'
import ImportService from './ImportService'

export default class SchemaService extends ImportService {
	public importDefinition = async (file: string) => {
		const definitionProxy = await this.importDefault(file)

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
