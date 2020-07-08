import { IGeneratedFile } from '../types/cli.types'

function hasArg(regex: RegExp) {
	return !!process.argv?.find((arg) => arg.search(regex) > -1)
}

const testUtil = {
	shouldClearCache() {
		return hasArg(/clear.*?skill.*?cache/gi)
	},
	isCacheEnabled() {
		return !hasArg(/no.*?skill.*?cache/gi)
	},
	findPathByNameInGeneratedFiles(
		name: string | RegExp,
		files: IGeneratedFile[]
	): string {
		const file = files.find((f) => f.name.search(name) > -1)?.path
		if (!file) {
			throw new Error(
				`file named ${name} no found in generated files. ${JSON.stringify(
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
