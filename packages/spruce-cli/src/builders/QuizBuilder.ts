import {
	FieldType,
	ISchemaDefinition,
	ISchemaDefinitionFields,
	SchemaFieldNames
} from '@sprucelabs/schema'
import FormBuilder, {
	IFormOptions,
	IFormPresentationOptions
} from './FormBuilder'
import Terminal from '../utilities/Terminal'
import { shuffle } from 'lodash'
import SpruceError from '../errors/Error'
import { ErrorCode } from '../.spruce/errors/codes.types'

/** multiple choice question */
export interface IQuizMultipleChoiceQuestion {
	type: FieldType.Select
	/** the question to ask */
	question: string
	/** all answers, first one is correct  */
	answers: string[]
}

export interface IQuizTextQuestion {
	type: FieldType.Text
	/** the question to ask */
	question: string
	/** all answers, first one is correct  */
	answer: string
}

/** quiz questions */
export interface IQuizQuestions {
	[key: string]: IQuizMultipleChoiceQuestion | IQuizTextQuestion
}

/** answer status */
export enum AnswerValidity {
	Correct = 'correct',
	Incorrect = 'incorrect'
}

/** options to present */
export interface IQuizPresentationOptions<
	T extends ISchemaDefinition,
	Q extends IQuizQuestions
> extends Omit<IFormPresentationOptions<T>, 'fields'> {
	/** select which questions you want to output? random still applies */
	questions?: QuizAnswerFieldNames<Q>[]

	/** overrides the randomize setting on the builder */
	randomizeQuestions?: boolean
}

/** all field names */
export type QuizAnswerFieldNames<Q extends IQuizQuestions> = Extract<
	keyof Q,
	string
>

/** the values returned by present */
export type QuizAnswers<Q extends IQuizQuestions> = {
	[K in QuizAnswerFieldNames<Q>]: string
}

/** tracking of right/wrongs */
export type QuizAnswerValidities<Q extends IQuizQuestions> = {
	[K in QuizAnswerFieldNames<Q>]: AnswerValidity
}

/** response from all questions */
export type QuizPresentationResults<Q extends IQuizQuestions> = {
	/** the answers that were given */
	answers: QuizAnswers<Q>

	/** the answers right or wrong */
	answerValidities: QuizAnswerValidities<Q>

	/** the percent of correct answers given  */
	percentCorrect: number

	/** how long it took them to take the quiz in ms */
	time: {
		startTimeMs: number
		endTimeMs: number
		totalTimeSec: number
	}

	/** how many were correct */
	totalCorrect: number

	/** how many were wrong */
	totalWrong: number

	/** how many questions we ended up taking */
	totalQuestions: number
}

/** options for instantiating a new quiz */
export interface IQuizOptions<
	T extends ISchemaDefinition,
	Q extends IQuizQuestions
> extends Omit<IFormOptions<T>, 'definition'> {
	/** should we randomize the questions */
	randomizeQuestions?: boolean
	/** the questions we are asking */
	questions: Q
}

export default class QuizBuilder<
	T extends ISchemaDefinition,
	Q extends IQuizQuestions
> {
	public formBuilder: FormBuilder<T>
	public term: Terminal
	public randomizeQuestions = true
	public originalQuestions: IQuizQuestions
	public lastResults?: QuizPresentationResults<Q>

	public constructor(options: IQuizOptions<T, Q>) {
		// we're going to build a schema from the questions and pass that to the form builder
		const definition = this.buildSchemaFromQuestions(options.questions)

		// track questions for later reference
		this.originalQuestions = options.questions

		// construct new form builder
		this.formBuilder = new FormBuilder<T>({
			...options,
			definition
		})

		// set state locally
		this.term = options.term
		this.randomizeQuestions = options.randomizeQuestions ?? true
	}

	/** present the quiz */
	public async present(
		options: IQuizPresentationOptions<T, Q> = {}
	): Promise<QuizPresentationResults<Q>> {
		const {
			questions = Object.keys(this.formBuilder.fields) as QuizAnswerFieldNames<
				Q
			>[],
			randomizeQuestions = this.randomizeQuestions
		} = options

		const startTime = new Date().getTime()

		// pull out answers
		const fields = randomizeQuestions ? shuffle(questions) : questions

		// ask for the answers
		const results = await this.formBuilder.present({
			...options,
			fields: fields as SchemaFieldNames<T>[]
		})

		// generate stats
		const answers: Partial<QuizAnswers<Q>> = {}
		const answerValidities: Partial<QuizAnswerValidities<Q>> = {}

		const totalQuestions = questions.length
		let totalCorrect = 0

		const questionNames = Object.keys(results) as QuizAnswerFieldNames<Q>[]

		questionNames.forEach(questionName => {
			const fieldName = questionName as SchemaFieldNames<T>
			const [validity, idx] = results[fieldName].split('-')

			// get the field to tell type
			const field = this.formBuilder.fields[fieldName]
			const fieldDefinition = field.definition

			switch (fieldDefinition.type) {
				case FieldType.Select:
					// pull the original multiple choice, we can cast it as multiple choice
					// question with confidence
					answers[questionName] = (this.originalQuestions[
						questionName
					] as IQuizMultipleChoiceQuestion).answers[idx]
					break
				default:
					// @ts-ignore TODO proper questions to schema should fix this because we only support a few fields
					answers[questionName] = results[fieldName]
			}

			// track validity
			if (validity === AnswerValidity.Correct) {
				totalCorrect = totalCorrect + 1
				answerValidities[questionName] = AnswerValidity.Correct
			} else {
				answerValidities[questionName] = AnswerValidity.Incorrect
			}
		}, 0)

		const totalWrong = totalQuestions - totalCorrect

		// track time
		const endTime = new Date().getTime()

		this.lastResults = {
			percentCorrect: totalCorrect / totalQuestions,
			totalCorrect,
			totalWrong,
			answerValidities: answerValidities as QuizAnswerValidities<Q>,
			answers: answers as QuizAnswers<Q>,
			totalQuestions,
			time: {
				startTimeMs: startTime,
				endTimeMs: endTime,
				totalTimeSec: +((endTime - startTime) / 1000).toFixed(1)
			}
		}

		return this.lastResults
	}

	/** render the scorecard (last results by default) */
	public async scorecard(
		options: {
			results?: QuizPresentationResults<Q>
			headline?: string
		} = {}
	) {
		const { headline, results = this.lastResults } = options
		const { term } = this

		if (!results) {
			throw new SpruceError({
				code: ErrorCode.InvalidParameters,
				parameters: []
			})
		}

		term.clear()
		term.hero(headline ?? 'Quiz results!')

		const object: Record<string, string> = {}

		this.formBuilder.getNamedFields().forEach(namedField => {
			const { name, field } = namedField
			const questionFieldName = name as QuizAnswerFieldNames<Q>
			const fieldDefinition = field.definition

			// get results
			const isCorrect = results.answerValidities[questionFieldName]
			const guessedAnswer = `${results.answers[questionFieldName]}`

			// build the real answer
			let realAnswer = ''

			switch (fieldDefinition.type) {
				case FieldType.Select:
					realAnswer = fieldDefinition.options.choices[0].label
					break
				default:
					// all options just pass through the answer tied to the question during instantiation
					realAnswer = (this.originalQuestions[
						questionFieldName
					] as IQuizTextQuestion).answer
			}

			const objectKey = field.getLabel() || '**missing'

			if (isCorrect) {
				object[objectKey] = `${chalk}`
			}
			debugger
		})

		term.section({
			object: {
				'question test': 'answer test'
			}
		})

		await term.wait()
	}

	/** takes questions and builds a schema */
	private buildSchemaFromQuestions(questions: IQuizQuestions): T {
		// TODO change ISchemaDefinitionFields to something based on schema generated from questions
		const fields: ISchemaDefinitionFields = {}

		Object.keys(questions).forEach(fieldName => {
			const question = questions[fieldName]

			switch (question.type) {
				case FieldType.Select:
					fields[fieldName] = {
						type: question.type,
						label: question.question,
						options: {
							choices: shuffle(
								question.answers.map((question, idx) => ({
									value:
										idx === 0
											? `${AnswerValidity.Correct}-${idx}`
											: `${AnswerValidity.Incorrect}-${idx}`,
									label: question
								}))
							)
						}
					}
					break
				default:
					fields[fieldName] = {
						type: question.type,
						label: question.question
					}
			}
		})

		//@ts-ignore TODO better mapping of questions to schema definition
		const definition: T = {
			id: 'quizGenerated',
			name: 'Generated quiz',
			fields
		}

		return definition
	}
}
