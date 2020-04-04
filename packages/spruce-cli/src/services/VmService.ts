import { NodeVM } from 'vm2'
import SpruceError from '../errors/SpruceError'
import { ErrorCode } from '../.spruce/errors/codes.types'
import Schema, { ISchemaDefinition } from '@sprucelabs/schema'
import fs from 'fs-extra'
import path from 'path'
import { cloneDeep } from 'lodash'
import AbstractService from './AbstractService'

export default class VmService extends AbstractService {
	private fileMapCache: Record<string, string> = {}

	/** import a schema definition from any file */
	public importDefinition(file: string) {
		let definitionProxy: ISchemaDefinition | undefined

		// lets make sure there is a complimentary build for for this or we can't continue
		const builtFile = file.replace('.ts', '.js').replace('/src/', '/build/src/')

		if (!fs.existsSync(builtFile)) {
			throw new SpruceError({
				code: ErrorCode.DefinitionFailedToImport,
				file,
				details: `It looks like you haven't built your project yet. try 'y watch'`
			})
		}

		// construct new vm
		const vm = new NodeVM({
			sandbox: {
				_define(def: ISchemaDefinition) {
					// build initial definition
					definitionProxy = cloneDeep(def)
				}
			},
			require: {
				external: true,
				// our own resolver for local files
				resolve: (name, dir) => {
					if (this.fileMapCache[name]) {
						return this.fileMapCache[name]
					}

					// there are a few options that could work
					const resolved = [path.join(dir, name), path.join(dir, name, 'index')]

					for (const path of resolved) {
						const filename = (path + '.js').replace('/src', '/build/src')
						if (fs.existsSync(filename) && fs.lstatSync(filename).isFile()) {
							this.fileMapCache[name] = filename
							return filename
						}
					}

					throw new SpruceError({
						code: ErrorCode.DefinitionFailedToImport,
						file,
						details: `Could not resolve definition import "${name}". Tried ${resolved.join(
							', '
						)}`
					})
				}
			}
		})

		// import source and transpile it
		const sourceCode = fs.readFileSync(builtFile).toString()
		// const js = this.transpileCode(sourceCode)

		// find name of schema definition variable
		const pattern = /exports.default = (.*?);/m
		const matches = sourceCode.match(pattern)
		const definitionName = matches?.[1]

		if (!definitionName) {
			throw new SpruceError({
				code: ErrorCode.DefinitionFailedToImport,
				file,
				details: `Could not match the pattern ${pattern}`
			})
		}

		// drop in define call
		const modifiedJs = sourceCode + `\n\n_define(${definitionName});`

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
}
