import log from '../lib/log'
import path from 'path'
import { Command } from 'commander'
import FormBuilder, { IFormOptions } from '../builders/FormBuilder'
import { ISchemaDefinition } from '@sprucelabs/schema'
import { IStores } from '#spruce/autoloaders/stores'
import { Mercury } from '@sprucelabs/mercury'
import { IServices } from '#spruce/autoloaders/services'
import { IGenerators } from '#spruce/autoloaders/generators'
import { IUtilities } from '#spruce/autoloaders/utilities'
import { Templates } from '@sprucelabs/spruce-templates'
import QuizBuilder, {
	IQuizOptions,
	IQuizQuestions
} from '../builders/QuizBuilder'
import { ICommands } from '../../.spruce/autoloaders/commands'
import Autoloadable from '../Autoloadable'

/** All commanders get this */
export interface ICommandOptions {
	stores: IStores
	mercury: Mercury
	services: IServices
	generators: IGenerators
	cwd: string
	utilities: IUtilities
	templates: Templates
}

export interface IWriteOptions {
	pretty?: boolean
	build?: boolean
}

export default abstract class AbstractCommand extends Autoloadable {
	public stores: IStores
	public mercury: Mercury
	public services: IServices
	public commands!: ICommands
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
			generators,
			utilities,
			templates
		} = options

		this.cwd = cwd
		this.stores = stores
		this.mercury = mercury
		this.services = services
		this.generators = generators
		this.utilities = utilities
		this.templates = templates
	}

	public afterAutoload(siblings: ICommands) {
		this.commands = siblings
	}

	/** Preps a form builder, you will need to call present() */
	public formBuilder<T extends ISchemaDefinition>(
		options: Omit<IFormOptions<T>, 'term'>
	): FormBuilder<T> {
		const formBuilder = new FormBuilder({
			term: this.utilities.terminal,
			...options
		})
		return formBuilder
	}

	/** Preps a quiz builder, you will need to call present() */
	public quizBuilder<T extends ISchemaDefinition, Q extends IQuizQuestions>(
		options: Omit<IQuizOptions<T, Q>, 'term' | 'definition'>
	): QuizBuilder<T, Q> {
		const quizBuilder = new QuizBuilder({
			term: this.utilities.terminal,
			...options
		})
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
			options.pretty && this.services.lint.fix(destination)
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

	/** Delete a directory */
	public deleteDir(destination: string) {
		return this.generators.core.deleteDir(destination)
	}

	/** Does a file exist */
	public doesFileExist(destination: string) {
		return this.generators.core.doesFileExist(this.resolvePath(destination))
	}

	/** Are we in a skills dir? */
	public isInSkillDirectory() {
		return !!this.stores.skill.skillFromDir(this.cwd)
	}

	/** Kick off a build */
	public async build(file?: string) {
		log.info(`Ignoring build of ${file ?? 'entire project'}`)
		// This.startLoading('Building')
		// // Starting build
		// await new Promise(resolve => {
		// 	exec(
		// 		`node_modules/.bin/tsc ${file ? this.resolvePath(file) : ''}`,
		// 		{ cwd: this.cwd },
		// 		(err, stdout) => {
		// 			if (err) {
		// 				this.stopLoading()
		// 				this.error(file ? `Building ${file} error!` : 'Build error!')
		// 				this.error(stdout)
		// 			}
		// 			resolve()
		// 		}
		// 	)
		// })
		// this.stopLoading()
	}

	/** A chance to attach the commands you'll provide through the cli */
	abstract attachCommands(program: Command): void
}
