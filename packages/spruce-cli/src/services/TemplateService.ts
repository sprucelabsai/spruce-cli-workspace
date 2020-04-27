import globby from 'globby'
import handlebars from 'handlebars'
import fs from 'fs-extra'
import path from 'path'
import log from '../lib/log'
import AbstractService from './AbstractService'

export default class TemplateService extends AbstractService {
	/** Creates files in the destination directory following the structure of the template directory */
	public async applyTemplateDirectory(options: {
		/** The template name. This is the name of the directory in @sprucelabs/spruce-templates (src/templates/<templateName>) */
		templateName: string
		/** The path to write to. Default is cwd */
		dir?: string
		/** The data to pass into the templates */
		templateData?: Record<string, any>
	}) {
		const { templateData, dir } = options
		const files = globby.sync(`${__dirname}/../../templates/baseSkill/**/*`, {
			dot: true
		})
		for (let i = 0; i < files.length; i += 1) {
			const file = files[i]
			log.debug({ file })
			const {
				isHandlebarsTemplate,
				relativeBaseDirectory,
				filename
			} = this.parseTemplateFilePath(file)

			// const dirPathToWrite = `${process.cwd()}/${relativeBaseDirectory}`
			const dirPathToWrite = path.join(dir ?? this.cwd, relativeBaseDirectory)
			const filePathToWrite = path.join(dirPathToWrite, filename)

			await fs.ensureDir(dirPathToWrite)
			console.log('wrote path')
			if (isHandlebarsTemplate) {
				const template = fs.readFileSync(file)
				// Compile the file
				const compiledTemplate = handlebars.compile(template.toString())
				const result = compiledTemplate(templateData)

				await fs.writeFile(filePathToWrite, result)
			} else {
				// By default just copy the file over as-is
				console.log('COPY***')
				console.log(file)
				console.log(filePathToWrite)
				await fs.copy(file, filePathToWrite)
			}
		}
	}

	/** Parses a file path to parts needed for building the files */
	public parseTemplateFilePath(
		/** The full path to the file */
		filePath: string
	): {
		/** Whether this is a handlebars template file */
		isHandlebarsTemplate: boolean
		/** The full directory path before the filename */
		baseDirectory: string
		/** The relative directory path after "/templates/<templateName>" */
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
			/.*\/templates\/[^/]+\/(.*)$/
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
