import pathUtil from 'path'
import { Templates } from '@sprucelabs/spruce-templates'
import { IGeneratedFile, GeneratedFileAction } from '../types/cli.types'
import diskUtil from '../utilities/disk.utility'

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
		let action = GeneratedFileAction.Skipped

		if (!diskUtil.doesFileExist(destination)) {
			diskUtil.writeFile(destination, contents)
			action = GeneratedFileAction.Generated
		} else if (diskUtil.isFileDifferent(destination, contents)) {
			diskUtil.writeFile(destination, contents)
			action = GeneratedFileAction.Updated
		}

		myResults.push({ name, description, path: destination, action })

		return myResults
	}
}
