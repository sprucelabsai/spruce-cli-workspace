import fs from 'fs'
import path from 'path'
import globby from 'globby'
import handlebars from 'handlebars'
import {
	DirectoryTemplateKind,
	IDirectoryTemplateContextMap,
	IDirectoryTemplate
} from '../types/templates.types'

export default class TemplateDirectoryUtility {
	/** Returns the relative file paths for all the expected files in the directory template */
	public static async filesInTemplate(template: DirectoryTemplateKind) {
		const filePaths: string[] = []

		const files = await globby(
			path.join(__dirname, '../templates/directories', template),
			{
				dot: true
			}
		)

		for (let i = 0; i < files.length; i += 1) {
			const file = files[i]
			const { relativeBaseDirectory, filename } = this.parseTemplateFilePath(
				file
			)
			filePaths.push(path.join(relativeBaseDirectory, filename))
		}

		return filePaths
	}

	/** Build all the files in the directory for the template */
	public static async build<K extends DirectoryTemplateKind>(options: {
		/** The type of directory template to build */
		kind: K
		/** The data to pass into the templates */
		context?: IDirectoryTemplateContextMap[K]
	}): Promise<IDirectoryTemplate> {
		const builtFiles: IDirectoryTemplate = {
			files: []
		}
		const { kind, context } = options

		const files = await globby(
			path.join(__dirname, '../templates/directories', kind),
			{
				dot: true
			}
		)

		for (let i = 0; i < files.length; i += 1) {
			const file = files[i]
			const {
				isHandlebarsTemplate,
				relativeBaseDirectory,
				filename
			} = this.parseTemplateFilePath(file)

			const filePathToWrite = path.join(relativeBaseDirectory, filename)

			const template = fs.readFileSync(file).toString()
			if (isHandlebarsTemplate) {
				// Compile the file
				const compiledTemplate = handlebars.compile(template)
				const result = compiledTemplate(context)
				builtFiles.files.push({
					relativePath: filePathToWrite,
					contents: result
				})
			} else {
				builtFiles.files.push({
					relativePath: filePathToWrite,
					contents: template
				})
			}
		}

		return builtFiles
	}

	/** Parses a file path to parts needed for building the files */
	public static parseTemplateFilePath(
		/** The full path to the file */
		filePath: string
	): {
		/** Whether this is a handlebars template file */
		isHandlebarsTemplate: boolean
		/** The full directory path before the filename */
		baseDirectory: string
		/** The relative directory path after "/templates/directories/<templateName>" */
		relativeBaseDirectory: string
		/** The actual file name that would be output from this template */
		filename: string
		/** The template filename, ending in .hbs IF this is a handlebars template. Otherwise it's the same as the filename */
		templateFilename: string
	} {
		const fullPath = path.resolve(filePath)

		const matches = fullPath.match(/(.*)\/([^/]+)$/)

		const baseDirectory = matches && matches[1]
		const templateFilename = matches && matches[2]

		const fileMatches = templateFilename?.match(/(.*)\.hbs$/)
		let isHandlebarsTemplate = false
		let filename
		if (fileMatches && fileMatches[1]) {
			filename = fileMatches[1]
			isHandlebarsTemplate = true
		} else {
			filename = templateFilename
		}

		const baseDirectoryMatches = baseDirectory?.match(
			/.*\/templates\/directories\/[^/]+\/(.*)$/
		)

		const relativeBaseDirectory =
			(baseDirectoryMatches && baseDirectoryMatches[1]) || ''

		if (
			!baseDirectory ||
			!filename ||
			!templateFilename ||
			typeof relativeBaseDirectory === 'undefined'
		) {
			throw new Error('INVALID_TEMPLATE_FILES')
		}

		return {
			isHandlebarsTemplate,
			baseDirectory,
			relativeBaseDirectory,
			filename,
			templateFilename: templateFilename || filename
		}
	}
}
