import { NodeVM } from 'vm2'
import SpruceError from '../errors/SpruceError'
import { ErrorCode } from '#spruce/errors/codes.types'
import Schema, { ISchemaDefinition } from '@sprucelabs/schema'
import fs from 'fs-extra'
import pathUtil from 'path'
import * as ts from 'typescript'
import AbstractService from './AbstractService'
import PathResolver from '@sprucelabs/path-resolver'
import os from 'os'

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

		const tsConfigDir = PathResolver.resolveTsConfigDir(pathUtil.dirname(file))
		const tsConfig = JSON.parse(
			fs.readFileSync(pathUtil.join(tsConfigDir, 'tsconfig.json')).toString()
		)
		const fileContents = fs.readFileSync(file)
		const result = ts.transpileModule(fileContents.toString(), {
			compilerOptions: tsConfig.compilerOptions
		})

		const sourceCode = `
		${result.outputText}
			module.exports = exports.default`

		const localPathResolver = new PathResolver({
			cwd: pathUtil.dirname(file),
			enable: false
		})

		let vmError: Error | undefined
		try {
			const vm = new NodeVM({
				console: 'inherit',
				sandbox: {},
				sourceExtensions: ['ts', 'js'],
				require: {
					external: true,
					builtin: ['fs', 'path', 'util', 'module'],
					context: 'sandbox',
					resolve: name => {
						const path = localPathResolver.resolvePath(name)

						// Transpile ts files
						const ext = pathUtil.extname(path)
						if (ext === '.ts') {
							const fileContents = fs.readFileSync(path)
							const result = ts.transpileModule(fileContents.toString(), {
								compilerOptions: tsConfig.compilerOptions
							})
							const tmpFilePath = pathUtil.join(os.tmpdir(), name) + '.js'
							const code = `
								${result.outputText}
								module.exports = exports.default`

							fs.ensureFileSync(tmpFilePath)
							fs.writeFileSync(tmpFilePath, code)
							return tmpFilePath
						}

						return path
					}
				}
			})

			const cmdResult = await vm.run(sourceCode, file)

			// Stringifying and parsing cmdResult gives us a clean object we can pass back
			defaultImported = JSON.parse(JSON.stringify(cmdResult))
		} catch (err) {
			vmError = err
		}

		if (!defaultImported) {
			throw new SpruceError({
				code: ErrorCode.DefinitionFailedToImport,
				file,
				originalError: vmError,
				details: `No proxy object was returned from the vm.`
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
