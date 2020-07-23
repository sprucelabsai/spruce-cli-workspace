import fs from 'fs'
import diskUtil from './disk.utility'

const generatorUtil = {
	resolveFilename(dirOrFile: string, fallbackFileName: string) {
		const isDir = fs.lstatSync(dirOrFile).isDirectory()
		return isDir ? diskUtil.resolvePath(dirOrFile, fallbackFileName) : dirOrFile
	},
}

export default generatorUtil
