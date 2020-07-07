import pathUtil from 'path'
import fs from 'fs-extra'
const tsConfigUtil = {
	readConfig(dir: string): Record<string, any | undefined> {
		const source = dir
		const packagePath = pathUtil.join(source, 'tsconfig.json')
		const contents = fs.readFileSync(packagePath).toString()
		const parsed = JSON.parse(contents)
		return parsed
	},

	setPathAlias(dir: string, alias: string, patterns: string[]) {
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
	},

	isPathAliasSet(dir: string, path: string) {
		return !!this.readConfig(dir).compilerOptions?.paths?.[path]
	},
}

export default tsConfigUtil
