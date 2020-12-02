import os from 'os'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { assert } from '@sprucelabs/test'
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

	resolveCacheDir(cacheKey = '') {
		return diskUtil.resolvePath(os.tmpdir(), 'spruce-cli', cacheKey)
	},

	assertCountsByAction(
		files: GeneratedFile[],
		options: {
			generated: number
			updated: number
			skipped: number
		}
	) {
		const generated = files.filter((f) => f.action === 'generated').length
		const updated = files.filter((f) => f.action === 'updated').length
		const skipped = files.filter((f) => f.action === 'skipped').length

		assert.isEqual(
			generated,
			options.generated,
			`Generated the wrong number of files. Got ${generated} but expected ${options.generated}.`
		)

		assert.isEqual(
			updated,
			options.updated,
			`Updated the wrong number of files. Got ${updated} but expected ${options.updated}.`
		)

		assert.isEqual(
			skipped,
			options.skipped,
			`Skipped the wrong number of files. Got ${skipped} but expected ${options.skipped}.`
		)
	},

	assertsFileByNameInGeneratedFiles(
		name: string | RegExp,
		files: GeneratedFile[]
	): string {
		const file = files.find((f) => f.name.search(name) > -1)?.path
		assert.isTruthy(
			file,
			`file named '${name}' not found in generated files.\n\n${JSON.stringify(
				files,
				null,
				2
			)}`
		)

		return file
	},
}

export default testUtil
