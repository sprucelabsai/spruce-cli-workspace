import fs from 'fs'
import pathUtil from 'path'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { Templates } from '@sprucelabs/spruce-templates'
import { IGeneratedFile } from '../types/cli.types'

export interface IGeneratorOptions {
	templates: Templates
}

export type GenerationResults = IGeneratedFile[]

export default abstract class AbstractGenerator {
	protected templates: Templates

	public constructor(templates: Templates) {
		this.templates = templates
	}

	protected writeFileIfChangedMixinResults(
		destination: string,
		contents: string,
		description: string,
		results?: GenerationResults
	): GenerationResults {
		const myResults: GenerationResults = results ?? []

		const name = pathUtil.basename(destination)
		let action: IGeneratedFile['action'] = 'skipped'

		if (!diskUtil.doesFileExist(destination)) {
			diskUtil.writeFile(destination, contents)
			action = 'generated'
		} else if (diskUtil.isFileDifferent(destination, contents)) {
			diskUtil.writeFile(destination, contents)
			action = 'updated'
		}

		myResults.push({ name, description, path: destination, action })

		return myResults
	}

	protected resolveFilename(dirOrFile: string, fallbackFileName: string) {
		const isDir =
			diskUtil.doesDirExist(dirOrFile) &&
			fs.lstatSync(dirOrFile).isDirectory() &&
			pathUtil.extname(dirOrFile).length === 0
		return isDir ? diskUtil.resolvePath(dirOrFile, fallbackFileName) : dirOrFile
	}
}
