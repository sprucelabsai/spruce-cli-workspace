import AbstractUtility from './AbstractUtility'
import pathUtil from 'path'
import fs from 'fs-extra'

export default class TsConfigUtility extends AbstractUtility {
	/** Set path aliases for lookup */
	public setPath(alias: string, patterns: string[], dir = this.cwd) {
		const contents = this.readConfig(dir)
		const paths = contents.compilerOptions?.paths ?? {}

		// Set new path
		paths[alias] = patterns

		// Pass back to contents
		if (!contents.compilerOptions) {
			contents.compilerOptions = {}
		}
		contents.compilerOptions.paths = paths

		const destination = pathUtil.join(dir, 'tsconfig.json')
		fs.outputFileSync(destination, JSON.stringify(contents, null, 2))
	}

	/** Read a tsconfig.json */
	public readConfig(dir?: string): Record<string, any | undefined> {
		const source = dir ?? this.cwd
		const packagePath = pathUtil.join(source, 'tsconfig.json')
		const contents = fs.readFileSync(packagePath).toString()
		const parsed = JSON.parse(contents)
		return parsed
	}

	/** Setup the #spruce alias */
	public setupHashSpruce(dir = this.cwd) {
		if (!this.isPathSet('#spruce/')) {
			this.setPath('#spruce/*', ['.spruce/*'], dir)
		}
	}

	public isPathSet(path: string, dir = this.cwd) {
		return !!this.readConfig(dir).compilerOptions?.paths?.[path]
	}

	/** Sets up all paths for schemas */
	public setupForSchemas(dir = this.cwd) {
		this.setupHashSpruce(dir)
		if (!this.isPathSet('#spruce:schema/*')) {
			this.setPath('#spruce:schema/*', ['.spruce/schemas/*'])
		}
	}

	/** Setup for testing */
	public setupForErrors(dir = this.cwd) {
		this.setupForSchemas(dir)
	}
}
