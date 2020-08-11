/* eslint-disable @typescript-eslint/member-ordering */
import { ISchema } from '@sprucelabs/schema'
import { CommanderStatic } from 'commander'
import FormComponent, { IFormOptions } from '../components/FormComponent'
import QuizComponent, {
	IQuizOptions,
	IQuizQuestions,
} from '../components/QuizComponent'
import TerminalInterface from '../interfaces/TerminalInterface'
import ServiceFactory from '../services/ServiceFactory'
import log from '../singletons/log'

/** All commanders get this */
export interface ICommandOptions {
	cwd: string
	term: TerminalInterface
	serviceFactory: ServiceFactory
}

export default abstract class AbstractCommand {
	protected term: TerminalInterface
	protected cwd: string
	protected serviceFactory: ServiceFactory

	protected LintService = () => {
		return this.serviceFactory.Service(this.cwd, 'lint')
	}

	protected SchemaService = () => {
		return this.serviceFactory.Service(this.cwd, 'schema')
	}

	protected CommandService = () => {
		return this.serviceFactory.Service(this.cwd, 'command')
	}

	public constructor(options: ICommandOptions) {
		const { cwd, term, serviceFactory } = options
		this.cwd = cwd
		this.term = term
		this.serviceFactory = serviceFactory
	}

	public getFormComponent<T extends ISchema>(
		options: Omit<IFormOptions<T>, 'term'>
	): FormComponent<T> {
		const formBuilder = new FormComponent({
			term: this.term,
			...options,
		})
		return formBuilder
	}

	public getQuizComponent<T extends ISchema, Q extends IQuizQuestions>(
		options: Omit<IQuizOptions<T, Q>, 'term' | 'schema'>
	): QuizComponent<T, Q> {
		const quizBuilder = new QuizComponent({
			term: this.term,
			...options,
		})
		return quizBuilder
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
	abstract attachCommands(program: CommanderStatic['program']): void
}
