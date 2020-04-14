import { NodeVM } from 'vm2'
import SpruceError from '../errors/SpruceError'
import { ErrorCode } from '#spruce/errors/codes.types'
import Schema, { ISchemaDefinition } from '@sprucelabs/schema'
import fs from 'fs-extra'
import path from 'path'
import { cloneDeep } from 'lodash'
import AbstractService from './AbstractService'

export default class VmService extends AbstractService {
	private fileMapCache: Record<string, string> = {}

	/** Import an addon from any file (should end in .addon.ts) */
	public importAddon<T extends {}>(file: string): T {
		const addon = this.importDefault<T>(file)
		return addon
	}

	/** Import any default export in a script in a vm loaded against the cwd */
	public importDefault<T extends {}>(file: string): T {
		let defaultImported: T | undefined

		// Lets make sure there is a complimentary build for for this or we can't continue
		// const builtFile =
		// 	file.replace('.ts', '').replace('/src/', '/build/src/') + '.js'
		const builtFile = file

		if (!fs.existsSync(builtFile)) {
			throw new SpruceError({
				code: ErrorCode.FailedToImport,
				file,
				details: `I couldn't find the definition file`
			})
		}

		// Construct new vm
		const vm = new NodeVM({
			sourceExtensions: ['ts', 'js'],
			sandbox: {
				define(def: { default: T }) {
					// Build initial definition
					defaultImported = cloneDeep(def.default)
				}
			},
			require: {
				external: true,
				// Our own resolver for local files
				resolve: (name, dir) => {
					if (this.fileMapCache[name]) {
						return this.fileMapCache[name]
					}

					if (
						name === 'ts-node/register' ||
						name === 'tsconfig-paths/register'
					) {
						return name
						// Return path.join(this.cwd, 'node_modules', name)
					}

					if (name === '#spruce:vm/import') {
						return builtFile
					}

					// There are a few options that could work
					const filePath = path.join(dir, name)
					const resolved = [
						filePath,
						filePath.replace('/src', '/build/src'),
						filePath.replace('/.spruce/', '/build/.spruce/'),
						path.join(filePath, 'index'),
						path.join(filePath, 'index').replace('/src', '/build/src'),
						path.join(filePath, 'index').replace('/.spruce/', '/build/.spruce/')
					]

					for (const path of resolved) {
						const filename = path + '.js'

						if (fs.existsSync(filename) && fs.lstatSync(filename).isFile()) {
							this.fileMapCache[name] = filename
							return filename
						}
					}

					throw new SpruceError({
						code: ErrorCode.FailedToImport,
						file,
						details: `Could not resolve import "${name}". Tried ${resolved.join(
							', '
						)}`
					})
				}
			}
		})

		// Import source and transpile it
		const sourceCode = `
		require('ts-node/register');
		require('tsconfig-paths/register');
		
		const imported = require("#spruce:vm/import");
		define(imported);
		`

		// Run it
		vm.run(sourceCode, file)

		// Did the definition get fixed
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
	public importDefinition(file: string) {
		const definitionProxy = this.importDefault<ISchemaDefinition>(file)

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
