import { Log } from '@sprucelabs/log'
import Terminal from '../utilities/Terminal'
import path from 'path'
import { Command } from 'commander'
import FormBuilder, { IFormBuilderOptions } from '../builders/FormBuilder'
import {
	ISchemaDefinition,
	SchemaDefinitionPartialValues
} from '@sprucelabs/schema'
import { IStores } from '../stores'
import { Mercury } from '@sprucelabs/mercury'
import { IServices } from '../services'
import { IGenerators } from '../generators'
import { IUtilities } from '../utilities'
import { Templates } from '@sprucelabs/spruce-templates'
import SpruceError from '../errors/Error'
import { ErrorCode } from '../.spruce/errors/codes.types'

/** all commanders get this */
export interface ICommandOptions {
	stores: IStores
	mercury: Mercury
	services: IServices
	generators: IGenerators
	log: Log
	cwd: string
	utilities: IUtilities
	templates: Templates
}

export default abstract class AbstractCommand extends Terminal {
	/** spruce logger */
	public log: Log
	public stores: IStores
	public mercury: Mercury
	public services: IServices
	public cwd: string
	public generators: IGenerators
	public utilities: IUtilities
	public templates: Templates

	public constructor(options: ICommandOptions) {
		super()

		const {
			stores,
			mercury,
			services,
			cwd,
			log,
			generators,
			utilities,
			templates
		} = options

		this.cwd = cwd
		this.stores = stores
		this.mercury = mercury
		this.services = services
		this.log = log
		this.generators = generators
		this.utilities = utilities
		this.templates = templates
	}

	/** preps a form builder, you will need to call present() */
	public formBuilder<T extends ISchemaDefinition>(
		definition: T,
		initialValues: SchemaDefinitionPartialValues<T> = {},
		options: IFormBuilderOptions<T> = {}
	): FormBuilder<T> {
		const formBuilder = new FormBuilder(
			this,
			definition,
			initialValues,
			options
		)
		return formBuilder
	}

	/** helper to resolve paths absolutely and relatively */
	public resolvePath(...filePath: string[]): string {
		const cwd = process.cwd()
		let builtPath = path.join(...filePath)

		if (builtPath[0] !== '/') {
			// relative to the cwd
			if (builtPath[0] === '.') {
				builtPath = builtPath.substr(1)
			}

			builtPath = path.join(cwd, builtPath)
		}

		return builtPath
	}

	/** write a file to a place handling all directory creation (overwrites everything) */
	public async writeFile(destination: string, contents: string) {
		this.generators.core.writeFile(this.resolvePath(destination), contents)
		if (destination.substr(-3) === '.ts') {
			this.prettyFormatFile(destination)
			await this.build(destination)
		}
	}

	/** read a file */
	public readFile(destination: string) {
		return this.generators.core.readFile(this.resolvePath(destination))
	}

	/** delete a file */
	public deleteFile(destination: string) {
		return this.generators.core.deleteFile(destination)
	}

	/** does a file exist */
	public doesFileExist(destination: string) {
		return this.generators.core.doesFileExist(this.resolvePath(destination))
	}

	/** make a file pass lint */
	public prettyFormatFile(filePath: string) {
		// TODO get this to work
		console.log('prettier on', this.resolvePath(filePath))
	}

	/** kick off a build */
	public async build(file?: string) {
		// Todo make this better and building
		// const command = `tsc ${file ? file : ''}`
		// const command = `y build`
		// existsSync(command)

		this.startLoading('Waiting for build to complete')

		if (file) {
			const builtFile = this.resolvePath(file)
				.replace('/src/', '/build/src/')
				.replace('.ts', '.js')

			let attemptCount = 0
			do {
				if (attemptCount > 5) {
					throw new SpruceError({
						code: ErrorCode.BuildFailed,
						file
					})
				}
				attemptCount++
				await new Promise(resolve => setTimeout(resolve, 2000))
			} while (!this.doesFileExist(builtFile))
		} else {
			// because watch is running, we'll just wait for this to finish
			await new Promise(resolve => setTimeout(resolve, 5000))
		}

		this.stopLoading()
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
