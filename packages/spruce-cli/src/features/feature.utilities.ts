import pathUtil from 'path'
import namesUtil from '../utilities/names.utility'

const featuresUtil = {
	filePathToActionCode(path: string): string {
		const parts = path.split(pathUtil.sep)
		const name = parts.pop() ?? ''
		const ext = pathUtil.extname(name)
		const nameNoExt = name.substr(0, name.length - ext.length)
		const code = nameNoExt.replace('Action', '')

		return namesUtil.toCamel(code)
	},
}

export default featuresUtil
