import pathUtil from 'path'
import globby from 'globby'

const addonUtil = {
	import(...path: string[]) {
		const results = globby.sync(pathUtil.join(...path, '**', '*.addon.[t|j]s'))

		results.forEach((path) => {
			require(path)
		})
	},
}

export default addonUtil
