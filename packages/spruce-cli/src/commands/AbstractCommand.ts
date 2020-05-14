import path from 'path'
import { Mercury } from '@sprucelabs/mercury'
import { ISchemaDefinition } from '@sprucelabs/schema'
import { Templates } from '@sprucelabs/spruce-templates'
import { Command } from 'commander'
import { IAutoloaded } from '#spruce/autoloaders'
import { ICommands } from '#spruce/autoloaders/commands'
import { IGenerators } from '#spruce/autoloaders/generators'
import { IServices } from '#spruce/autoloaders/services'
import { IStores } from '#spruce/autoloaders/stores'
import { IUtilities } from '#spruce/autoloaders/utilities'
import Autoloadable from '../Autoloadable'
import FormBuilder, { IFormOptions } from '../builders/FormBuilder'
import QuizBuilder, {
	IQuizOptions,
	IQuizQuestions
} from '../builders/QuizBuilder'
import log from '../lib/log'
import TerminalUtility from '../utilities/TerminalUtility'

/** All commanders get this */
export interface ICommandOptions {
	mercury: Mercury
	cwd: string
	templates: Templates
}

export interface IWriteOptions {
	pretty?: boolean
	build?: boolean
}

export default abstract class AbstractCommand extends Autoloadable {
	protected stores!: IStores
	protected mercury: Mercury
	protected services!: IServices
	protected commands!: ICommands
	protected generators!: IGenerators
	protected utilities!: IUtilities
	protected templates: Templates
	/** Convenience method that references this.utilities.terminal */
	protected term!: TerminalUtility

	public constructor(options: ICommandOptions) {
		super(options)

		const { mercury, cwd, templates } = options

		this.cwd = cwd
		this.mercury = mercury
		this.templates = templates
	}

	public afterAutoload(autoloaded: IAutoloaded) {
		this.commands = autoloaded.commands
		this.stores = autoloaded.stores
		this.services = autoloaded.services
		this.generators = autoloaded.generators
		this.utilities = autoloaded.utilities
		this.term = this.utilities.terminal
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
