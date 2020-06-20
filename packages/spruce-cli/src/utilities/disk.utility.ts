import path from 'path'
import fs from 'fs-extra'

const diskUtil = {
	writeFile(destination: string, contents: string) {
		fs.outputFileSync(destination, contents)
	},
	readFile(source: string) {
		if (!fs.existsSync(source)) {
			throw new Error(`No file to read at ${source}`)
		}
		return fs.readFileSync(source).toString()
	},
	deleteFile(destination: string) {
		if (fs.existsSync(destination)) {
			fs.removeSync(destination)
		}
	},
	mkDir(destination: string) {
		fs.mkdirSync(destination)
	},
	deleteDir(destination: string) {
		if (fs.existsSync(destination)) {
			fs.removeSync(destination)
		}
	},
	doesFileExist(destination: string) {
		return fs.existsSync(destination)
	},
	doesDirExist(destination: string) {
		return fs.existsSync(destination)
	},
	resolvePath(cwd: string, ...filePath: string[]): string {
		let builtPath = path.join(...filePath)

		if (builtPath[0] !== '/') {
			// Relative to the cwd
			if (builtPath.substr(0, 2) === './') {
				builtPath = builtPath.substr(1)
			}

			builtPath = path.join(cwd, builtPath)
		}

		return builtPath
	}
}
export default diskUtil
