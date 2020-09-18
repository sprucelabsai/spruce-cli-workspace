import fs from 'fs'
import pathUtil from 'path'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { Templates } from '@sprucelabs/spruce-templates'
import { GeneratedFile, IGraphicsInterface } from '../types/cli.types'

export type GenerationResults = GeneratedFile[]

export interface IGeneratorOptions {
	templates: Templates
	term: IGraphicsInterface
	askBeforeUpdating?: boolean
}

export default abstract class AbstractGenerator {
	protected templates: Templates
	private askBeforeUpdating = false
	private term: IGraphicsInterface

	public constructor(options: IGeneratorOptions) {
		this.templates = options.templates
		this.term = options.term
		this.askBeforeUpdating = !!options.askBeforeUpdating
	}

	protected async writeFileIfChangedMixinResults(
		destination: string,
		contents: string,
		description: string,
		results?: GenerationResults
	): Promise<GenerationResults> {
		const myResults: GenerationResults = results ?? []

		const name = pathUtil.basename(destination)
		let action: GeneratedFile['action'] = 'skipped'

		if (diskUtil.isDir(destination)) {
			throw new Error(`Can't write to a directory ${destination}.`)
		}
		if (!diskUtil.doesFileExist(destination)) {
			diskUtil.writeFile(destination, contents)
			action = 'generated'
		} else if (diskUtil.isFileDifferent(destination, contents)) {
			let write = true
			if (this.askBeforeUpdating) {
				write = await this.term.confirm(`Overwrite ${destination}?`)
			}

			if (write) {
				diskUtil.writeFile(destination, contents)
				action = 'updated'
			}
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
