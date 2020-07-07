import pathUtil from 'path'
import { IDirectoryTemplateFile } from '@sprucelabs/spruce-templates'
import fs from 'fs-extra'
import ErrorCode from '#spruce/errors/errorCode'
import { HASH_SPRUCE_DIR } from '../constants'
import SpruceError from '../errors/SpruceError'

const diskUtil = {
	writeFile(destination: string, contents: string) {
		fs.outputFileSync(destination, contents)
	},
	readDir(destination: string) {
		return fs.readdirSync(destination)
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
	createDir(destination: string) {
		fs.ensureDirSync(destination)
	},
	moveDir(source: string, destination: string) {
		fs.moveSync(source, destination)
	},
	copyDir(source: string, destination: string) {
		fs.copySync(source, destination)
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
	resolveHashSprucePath(cwd: string, ...filePath: string[]): string {
		return this.resolvePath(cwd, HASH_SPRUCE_DIR, ...filePath)
	},
	isFileDifferent(destination: string, contents: string) {
		const currentContents = this.readFile(destination)
		return currentContents.trim() !== contents.trim()
	},
	resolvePath(cwd: string, ...filePath: string[]): string {
		let builtPath = pathUtil.join(...filePath)

		if (builtPath[0] !== '/') {
			// Relative to the cwd
			if (builtPath.substr(0, 2) === './') {
				builtPath = builtPath.substr(1)
			}

			builtPath = pathUtil.join(cwd, builtPath)
		}

		return builtPath
	},
	async createManyFiles(cwd: string, files: IDirectoryTemplateFile[]) {
		const writes: Promise<void>[] = []
		for (let i = 0; i < files.length; i += 1) {
			const file = files[i]
			const filePathToWrite = pathUtil.join(cwd, file.relativePath)
			const dirPathToWrite = pathUtil.dirname(filePathToWrite)

			await fs.ensureDir(dirPathToWrite)

			if (this.doesFileExist(filePathToWrite)) {
				throw new SpruceError({
					code: ErrorCode.FileExists,
					file: filePathToWrite,
					friendlyMessage: `The file already exists. Remove this file or set a different WriteMode`
				})
			}

			writes.push(fs.writeFile(filePathToWrite, file.contents))
		}

		await Promise.all(writes)
	}
}
export default diskUtil
