// Import { NodeVM } from 'vm2'
import SpruceError from '../errors/SpruceError'
import { ErrorCode } from '#spruce/errors/codes.types'
import Schema, { ISchemaDefinition } from '@sprucelabs/schema'
import fs from 'fs-extra'
import path from 'path'
// Import * as ts from 'typescript'
// Import { cloneDeep } from 'lodash'
import AbstractService from './AbstractService'
import { execSync } from 'child_process'
export default class VmService extends AbstractService {
	// Private fileMapCache: Record<string, string> = {}

	/** Import an addon from any file (should end in .addon.ts) */
	public async importAddon<T extends {}>(file: string): Promise<T> {
		const addon = await this.importDefault<T>(file)
		return addon
	}

	/** Import any default export in a script in a vm loaded against the cwd */
	public async importDefault<T extends {}>(file: string): Promise<T> {
		let defaultImported: T | undefined

		if (!fs.existsSync(file)) {
			throw new SpruceError({
				code: ErrorCode.FailedToImport,
				file,
				details: `I couldn't find the definition file`
			})
		}

		// 1. Build skill
		// execSync('y build:node')
		// 2. import file

		// // Construct new vm
		// const vm = new NodeVM({
		// 	sourceExtensions: ['ts', 'js'],
		// 	sandbox: {
		// 		define(def: { default: T }) {
		// 			// Build initial definition
		// 			defaultImported = cloneDeep(def.default)
		// 		}
		// 	},
		// 	require: {
		// 		external: true,
		// 		// Our own resolver for local files
		// 		resolve: (name, dir) => {
		// 			if (this.fileMapCache[name]) {
		// 				return this.fileMapCache[name]
		// 			}

		// 			if (
		// 				name === 'ts-node/register' ||
		// 				name === '@sprucelabs/path-resolver'
		// 			) {
		// 				return name
		// 				// Return path.join(this.cwd, 'node_modules', name)
		// 			}

		// 			if (name === '#spruce:vm/import') {
		// 				return file
		// 			}

		// 			// There are a few options that could work
		// 			const filePath = path.join(dir, name)
		// 			const resolved = [
		// 				filePath,
		// 				filePath.replace('/src', '/build/src'),
		// 				filePath.replace('/.spruce/', '/build/.spruce/'),
		// 				path.join(filePath, 'index'),
		// 				path.join(filePath, 'index').replace('/src', '/build/src'),
		// 				path.join(filePath, 'index').replace('/.spruce/', '/build/.spruce/')
		// 			]

		// 			for (const path of resolved) {
		// 				const filename = path + '.js'

		// 				if (fs.existsSync(filename) && fs.lstatSync(filename).isFile()) {
		// 					this.fileMapCache[name] = filename
		// 					return filename
		// 				}
		// 			}

		// 			throw new SpruceError({
		// 				code: ErrorCode.FailedToImport,
		// 				file,
		// 				details: `Could not resolve import "${name}". Tried ${resolved.join(
		// 					', '
		// 				)}`
		// 			})
		// 		}
		// 	}
		// })

		// console.log(vm)
		const baseDir = path.dirname(file)
		// Const program = ts.createProgram([file], {
		// 	allowJs: true,
		// 	baseUrl: baseDir
		// })
		// console.log(program)
		// debugger

		// const emitResult = program.emit()
		// const allDiagnostics = ts
		// 	.getPreEmitDiagnostics(program)
		// 	.concat(emitResult.diagnostics)
		// allDiagnostics.forEach(diagnostic => {
		// 	if (diagnostic.file) {
		// 		const {
		// 			line,
		// 			character
		// 		} = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start || 0)
		// 		const message = ts.flattenDiagnosticMessageText(
		// 			diagnostic.messageText,
		// 			'\n'
		// 		)
		// 		console.log(
		// 			`${diagnostic.file.fileName} (${line + 1},${character +
		// 				1}): ${message}`
		// 		)
		// 	} else {
		// 		console.log(
		// 			ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')
		// 		)
		// 	}
		// })

		const divider = '--------###divider###--------'
		const fileName = file.replace(baseDir, '').replace(path.sep, '')
		const ext = path.extname(fileName)
		const fileWithoutExtension = fileName.substr(
			0,
			fileName.length - ext.length
		)
		// Import source and transpile it
		const sourceCode = `
const register = require('@sprucelabs/path-resolver').register;
register();
require('#spruce:schema/fields/fields.types');
const imported = require('./${fileWithoutExtension}');
console.log('${divider}');
console.log(JSON.stringify(imported.default));
		`
		const oneLiner = sourceCode.split('\n').join('')
		try {
			const response = execSync(
				`node -r ts-node/register/transpile-only -e "${oneLiner}"`,
				{
					cwd: baseDir
				}
			)
				.toString()
				.split(divider)
				.pop()
			if (response) {
				defaultImported = JSON.parse(response.trim())
			}
		} catch (err) {
			console.log(err)
		}

		// Temporarily write file
		// const destination = path.join(
		// 	os.tmpdir(),
		// 	'spruce-cli',
		// 	baseDir,
		// 	fileWithoutExtension + '.js'
		// )
		// fs.mkdtempSync(destination)
		// fs.writeFileSync(destination, sourceCode)

		// Run it
		// temporarily disable ts extension
		// const oldCompiler = require.extensions['.ts'] // Tslint:disable-line
		// delete require.extensions['.ts'] // Tslint:disable-line
		// vm.run(sourceCode, file)
		// vm.runFile(file)
		// Set it back
		// require.extensions['.ts'] = oldCompiler

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
