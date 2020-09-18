import { GeneratedFile } from '../types/cli.types'

function hasArg(regex: RegExp) {
	return !!process.argv?.find((arg) => arg.search(regex) > -1)
}

const testUtil = {
	shouldClearCache() {
		return hasArg(/clear.*?cache/gi)
	},
	isCacheEnabled() {
		return !hasArg(/no.*?cache/gi)
	},
	assertsFileByNameInGeneratedFiles(
		name: string | RegExp,
		files: GeneratedFile[]
	): string {
		const file = files.find((f) => f.name.search(name) > -1)?.path
		if (!file) {
			throw new Error(
				`file named ${name} not found in generated files. ${JSON.stringify(
					files,
					null,
					2
				)}`
			)
		}

		return file
	},
}

export default testUtil
