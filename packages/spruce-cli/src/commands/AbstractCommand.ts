import { ISchemaDefinition } from '@sprucelabs/schema'
import { Command } from 'commander'
import FormComponent, { IFormOptions } from '../components/FormComponent'
import QuizComponent, {
	IQuizOptions,
	IQuizQuestions
} from '../components/QuizComponent'
import TerminalService from '../services/TerminalService'
import log from '../singletons/log'

/** All commanders get this */
export interface ICommandOptions {
	cwd: string
	term: TerminalService
}

export default abstract class AbstractCommand {
	protected term: TerminalService
	protected cwd: string

	public constructor(options: ICommandOptions) {
		const { cwd, term } = options
		this.cwd = cwd
		this.term = term
	}

	public getFormComponent<T extends ISchemaDefinition>(
		options: Omit<IFormOptions<T>, 'term'>
	): FormComponent<T> {
		const formBuilder = new FormComponent({
			term: this.term,
			...options
		})
		return formBuilder
	}

	public getQuizComponent<
		T extends ISchemaDefinition,
		Q extends IQuizQuestions
	>(
		options: Omit<IQuizOptions<T, Q>, 'term' | 'definition'>
	): QuizComponent<T, Q> {
		const quizBuilder = new QuizComponent({
			term: this.term,
			...options
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
	abstract attachCommands(program: Command): void
}
