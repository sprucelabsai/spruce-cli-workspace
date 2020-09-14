import { validateSchema } from '@sprucelabs/schema'
import SpruceError from '../errors/SpruceError'
import ImportService from './ImportService'

export default class SchemaService extends ImportService {
	public importSchema = async (file: string) => {
		const definitionProxy = await this.importDefault(file)

		try {
			validateSchema(definitionProxy)
		} catch (err) {
			throw new SpruceError({
				code: 'SCHEMA_FAILED_TO_IMPORT',
				file,
				originalError: err,
				friendlyMessage:
					'The definition imported is not valid. Make sure it is "export default build[Schema|Error|Field]Definition"',
			})
		}

		return definitionProxy
	}
}
