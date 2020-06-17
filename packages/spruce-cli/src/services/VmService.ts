import Schema from '@sprucelabs/schema'
import ErrorCode from '#spruce/errors/errorCode'
import SpruceError from '../errors/SpruceError'
import { IImportOptions } from '../services/ChildService'
import AbstractService from './AbstractService'

export default class VmService extends AbstractService {
	/** Import an addon from any file (should end in .addon.ts) */
	public async importAddon<T extends {}>(
		file: string,
		options: IImportOptions = {}
	): Promise<T> {
		const addon = await this.services.child.importDefault<T>(file, options)
		return addon
	}

	/** Import a schema definition from any file */
	public async importDefinition(file: string, options: IImportOptions = {}) {
		const definitionProxy = await this.services.child.importDefault(
			file,
			options
		)

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
