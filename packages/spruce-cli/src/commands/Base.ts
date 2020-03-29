import logger, { ISpruceLog } from '@sprucelabs/log'
import Terminal from '../utilities/Terminal'
import path from 'path'
import { Command } from 'commander'
import FormBuilder from '../builders/FormBuilder'
import { ISchemaDefinition, SchemaDefinitionValues } from '@sprucelabs/schema'
import { IStores } from '../stores'
import { Mercury } from '@sprucelabs/mercury'
import { IServices } from '../services'
import fs from 'fs-extra'

// @ts-ignore
const _log = logger.log
_log.setOptions({
	level: 'info'
})

/** all commanders get this */
export interface ICommandOptions {
	stores: IStores
	mercury: Mercury
	services: IServices
	cwd: string
}

export default abstract class BaseCommand extends Terminal {
	/** spruce logger */
	public log: ISpruceLog = _log
	public stores: IStores
	public mercury: Mercury
	public services: IServices
	public cwd: string

	public constructor(options: ICommandOptions) {
		super()

		const { stores, mercury, services, cwd } = options

		this.cwd = cwd
		this.stores = stores
		this.mercury = mercury
		this.services = services
	}

	/** preps a form builder, you will need to call present() */
	public formBuilder<T extends ISchemaDefinition>(
		definition: T,
		initialValues: Partial<SchemaDefinitionValues<T>> = {}
	): FormBuilder<T> {
		const formBuilder = new FormBuilder(this, definition, initialValues)
		return formBuilder
	}

	/** helper to resolve paths absolutely and relatively */
	public resolvePath(...filePath: string[]): string {
		const cwd = process.cwd()
		let builtPath = path.join(...filePath)

		if (filePath[0] !== '/') {
			// relative to the cwd
			if (filePath[0] === '.') {
				builtPath = builtPath.substr(1)
			}

			builtPath = path.join(cwd, builtPath)
		}

		return builtPath
	}

	/** write a file to a place handling all directory creation (overwrites everything) */
	public writeFile(destination: string, contents: string) {
		fs.outputFileSync(destination, contents)
	}

	/** make a file pass lint */
	public prettyFormatFile(filePath: string) {
		// TODO get this to work
		console.log('prettier on', filePath)
	}

	/** are we in a skills dir? */
	public isInSkillDirectory() {
		return !!this.stores.skill.skillFromDir(this.cwd)
	}

	/** Parses a file path to parts needed for building the files */
	// protected parseTemplateFilePath(
	// 	/** The full path to the file */
	// 	filePath: string
	// ): {
	// 	/** Whether this is a handlebars template file */
	// 	isHandlebarsTemplate: boolean
	// 	/** The full directory path before the filename */
	// 	baseDirectory: string
	// 	/** The relative directory path after "/templates/<templateName>" */
	// 	relativeBaseDirectory: string
	// 	/** The actual file name that would be output from this template */
	// 	filename: string
	// 	/** The template filename, ending in .hbs IF this is a handlebars template. Otherwise it's the same as the filename */
	// 	templateFilename: string
	// } {
	// 	const fullPath = path.resolve(filePath)

	// 	const matches = fullPath.match(/(.*)\/([^/]+)$/)

	// 	const baseDirectory = matches && matches[1]
	// 	const templateFilename = matches && matches[2]

	// 	const fileMatches = templateFilename?.match(/(.*)\.hbs$/)
	// 	let isHandlebarsTemplate = false
	// 	let filename
	// 	if (fileMatches && fileMatches[1]) {
	// 		filename = fileMatches[1]
	// 		isHandlebarsTemplate = true
	// 	} else {
	// 		filename = templateFilename
	// 	}

	// 	const baseDirectoryMatches = baseDirectory?.match(
	// 		/.*\/templates\/[^/]+\/(.*)$/
	// 	)

	// 	const relativeBaseDirectory =
	// 		(baseDirectoryMatches && baseDirectoryMatches[1]) || ''

	// 	this.bar()
	// 	this.bar()
	// 	this.bar()
	// 	this.bar()

	// 	this.object({
	// 		state: {
	// 			fullPath,
	// 			matches,
	// 			baseDirectory,
	// 			templateFilename,
	// 			fileMatches,
	// 			filename,
	// 			baseDirectoryMatches,
	// 			relativeBaseDirectory
	// 		}
	// 	})

	// 	this.writeLn(!baseDirectory)
	// 	this.writeLn(!filename)
	// 	this.writeLn(!templateFilename)
	// 	this.writeLn(typeof relativeBaseDirectory === 'undefined')

	// 	if (
	// 		!baseDirectory ||
	// 		!filename ||
	// 		!templateFilename ||
	// 		typeof relativeBaseDirectory === 'undefined'
	// 	) {
	// 		throw new Error('INVALID_TEMPLATE_FILES')
	// 	}

	// 	return {
	// 		isHandlebarsTemplate,
	// 		baseDirectory,
	// 		relativeBaseDirectory,
	// 		filename,
	// 		templateFilename: templateFilename || filename
	// 	}
	// }
	/** a chance to attach the commands you'll provide through the cli */
	abstract attachCommands(program: Command): void
}
