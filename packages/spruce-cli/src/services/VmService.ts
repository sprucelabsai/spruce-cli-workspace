import { NodeVM } from 'vm2'
import log from '../lib/log'
import SpruceError from '../errors/SpruceError'
import { ErrorCode } from '#spruce/errors/codes.types'
import Schema, { ISchemaDefinition } from '@sprucelabs/schema'
import fs from 'fs-extra'
import * as ts from 'typescript'
import AbstractService from './AbstractService'

export default class VmService extends AbstractService {
	/** Import an addon from any file (should end in .addon.ts) */
	public async importAddon<T extends {}>(file: string): Promise<T> {
		const addon = await this.importDefault<T>(file)
		return addon
	}

	public async importDefault<T extends {}>(file: string): Promise<T> {
		let defaultImported: T | undefined
		if (!fs.existsSync(file)) {
			throw new SpruceError({
				code: ErrorCode.FailedToImport,
				file,
				details: `I couldn't find the definition file`
			})
		}

		const fileContents = fs.readFileSync(file)

		const result = ts.transpileModule(fileContents.toString(), {
			compilerOptions: { module: ts.ModuleKind.CommonJS }
		})

		const sourceCode = `${result.outputText}
			module.exports = exports.default`

		try {
			const vm = new NodeVM({
				console: 'inherit',
				sandbox: {},
				sourceExtensions: ['ts', 'js'],
				require: {
					external: true,
					builtin: ['fs', 'path', 'util'],
					context: 'host'
				}
			})

			const cmdResult = await vm.run(sourceCode, file)

			// Stringifying and parsing cmdResult gives us a clean object we can pass back
			defaultImported = JSON.parse(JSON.stringify(cmdResult))
		} catch (e) {
			log.warn(e)
		}

		if (!defaultImported) {
			throw new SpruceError({
				code: ErrorCode.DefinitionFailedToImport,
				file,
				details: `No proxy object was returned from the vm. The file probably does not have a definition.`
			})
		}
		return defaultImported
	}

	/** Import a schema definition from any file */
	public async importDefinition(file: string) {
		const definitionProxy = await this.importDefault<ISchemaDefinition>(file)

		// Is this a valid schema?
		if (!Schema.isDefinitionValid(definitionProxy)) {
			throw new SpruceError({
				code: ErrorCode.DefinitionFailedToImport,
				file,
				details:
					'The definition imported is not valid. Make sure it is "export default build[Schema|Error|Field]Definition"'
			})
		}

		return definitionProxy as ISchemaDefinition
	}
}
