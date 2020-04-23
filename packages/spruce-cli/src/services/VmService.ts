import SpruceError from '../errors/SpruceError'
import { ErrorCode } from '#spruce/errors/codes.types'
import Schema from '@sprucelabs/schema'
import AbstractService from './AbstractService'

export default class VmService extends AbstractService {
	/** Import an addon from any file (should end in .addon.ts) */
	public async importAddon<T extends {}>(file: string): Promise<T> {
		const addon = await this.utilities.child.importDefault<T>(file)
		return addon
	}

	/** Import a schema definition from any file */
	public async importDefinition(file: string) {
		const definitionProxy = await this.utilities.child.importDefault(file)

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
