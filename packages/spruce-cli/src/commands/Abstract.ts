import { Log } from '@sprucelabs/log'
import TerminalUtility from '../utilities/TerminalUtility'
import path from 'path'
import { Command } from 'commander'
import FormBuilder, { IFormOptions } from '../builders/FormBuilder'
import { ISchemaDefinition } from '@sprucelabs/schema'
import { IStores } from '../stores'
import { Mercury } from '@sprucelabs/mercury'
import { IServices } from '../services'
import { IGenerators } from '../generators'
import { IUtilities } from '../utilities'
import { Templates } from '@sprucelabs/spruce-templates'
import QuizBuilder, {
	IQuizOptions,
	IQuizQuestions
} from '../builders/QuizBuilder'
import { exec } from 'child_process'

/** All commanders get this */
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

export interface IWriteOptions {
	pretty?: boolean
	build?: boolean
}
export default abstract class AbstractCommand extends TerminalUtility {
	/** Spruce logger */
	public log: Log
	public stores: IStores
	public mercury: Mercury
	public services: IServices
	public cwd: string
	public generators: IGenerators
	public utilities: IUtilities
	public templates: Templates

	public constructor(options: ICommandOptions) {
		super(options)

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

	/** Preps a form builder, you will need to call present() */
	public formBuilder<T extends ISchemaDefinition>(
		options: Omit<IFormOptions<T>, 'term'>
	): FormBuilder<T> {
		const formBuilder = new FormBuilder({ term: this, ...options })
		return formBuilder
	}

	/** Preps a quiz builder, you will need to call present() */
	public quizBuilder<T extends ISchemaDefinition, Q extends IQuizQuestions>(
		options: Omit<IQuizOptions<T, Q>, 'term' | 'definition'>
	): QuizBuilder<T, Q> {
		const quizBuilder = new QuizBuilder({ term: this, ...options })
		return quizBuilder
	}

	/** Helper to resolve paths absolutely and relatively */
	public resolvePath(...filePath: string[]): string {
		const cwd = this.cwd
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

	/** Write a file to a place handling all directory creation (overwrites everything) */
	public async writeFile(
		destination: string,
		contents: string,
		options: IWriteOptions = {}
	) {
		this.generators.core.writeFile(this.resolvePath(destination), contents)
		if (destination.substr(-3) === '.ts') {
			options.pretty && this.pretty(destination)
			options.build && (await this.build(destination))
		}
	}

	/** Read a file */
	public readFile(destination: string) {
		return this.generators.core.readFile(this.resolvePath(destination))
	}

	/** Delete a file */
	public deleteFile(destination: string) {
		return this.generators.core.deleteFile(destination)
	}

	/** Does a file exist */
	public doesFileExist(destination: string) {
		return this.generators.core.doesFileExist(this.resolvePath(destination))
	}

	/** Make a file pass lint */
	public async pretty(filePath?: string) {
		filePath && this.log.info(`lint running on all files, not just ${filePath}`)
		return this.utilities.package.lintFix()
	}

	/** Kick off a build */
	public async build(file?: string) {
		this.startLoading('Building')

		// Starting build
		await new Promise(resolve => {
			exec(
				`node_modules/.bin/tsc ${file ? this.resolvePath(file) : ''}`,
				{ cwd: this.cwd },
				(err, stdout) => {
					if (err) {
						this.stopLoading()
						this.error(file ? `Building ${file} error!` : 'Build error!')
						this.error(stdout)
					}
					resolve()
				}
			)
		})

		this.stopLoading()
	}

	/** Are we in a skills dir? */
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
