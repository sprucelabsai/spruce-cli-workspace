import { NodeVM } from 'vm2'
import typescript, { CompilerOptions } from 'typescript'
import SpruceError from '../errors/Error'
import { ErrorCode } from '../.spruce/errors/codes.types'
import Schema, { ISchemaDefinition } from '@sprucelabs/schema'
import fs from 'fs-extra'

export default class NodeUtility {
	public compilerOptions: CompilerOptions

	public constructor(options: { compilerOptions: CompilerOptions }) {
		this.compilerOptions = options.compilerOptions
	}

	/** import a schema definition from any file */
	public importDefinition(file: string) {
		let definitionProxy: ISchemaDefinition | undefined

		// construct new vm
		const vm = new NodeVM({
			sandbox: {
				_define: (def: ISchemaDefinition) => {
					// build initial definition
					definitionProxy = {
						id: def.id,
						name: def.name,
						description: def.description
					}

					// bring over all fields
					Object.keys(def).forEach(key => {
						// @ts-ignore TODO see how to do this "properly" or if it's even possible
						definitionProxy[key] = def[key]
					})
				}
			},
			require: {
				external: true
			}
		})

		// import source and transpile it
		const sourceCode = fs.readFileSync(file).toString()
		const js = this.transpileCode(sourceCode)

		// find name of schema definition variable
		const pattern = /exports.default = (.*?);/m
		const matches = js.match(pattern)
		const definitionName = matches?.[1]

		if (!definitionName) {
			throw new SpruceError({
				code: ErrorCode.DefinitionFailedToImport,
				file,
				details: `Could not match the pattern ${pattern}`
			})
		}

		// drop in define call
		const modifiedJs = js + `\n\n_define(${definitionName});`

		// run it
		vm.run(modifiedJs, file)

		// did the definition get fixed
		if (!definitionProxy) {
			throw new SpruceError({
				code: ErrorCode.DefinitionFailedToImport,
				file,
				details: `No proxy object was returned from the vm`
			})
		}

		// is this a valid schema?
		if (!Schema.isDefinitionValid(definitionProxy)) {
			throw new Error('definition is bad')
		}

		return definitionProxy as ISchemaDefinition
	}

	/** typescript transpiler, just send the code */
	public transpileCode(sourceCode: string) {
		const result = typescript.transpileModule(sourceCode, {
			compilerOptions: { module: typescript.ModuleKind.CommonJS }
		})
		const { outputText } = result
		if (!outputText) {
			throw new SpruceError({
				code: ErrorCode.TranspileFailed,
				source: sourceCode
			})
		}
		return outputText
	}
}
