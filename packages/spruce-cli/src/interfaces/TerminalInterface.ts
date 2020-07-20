import path from 'path'
import { FieldFactory, FieldDefinitionValueType } from '@sprucelabs/schema'
// @ts-ignore No definition available
import { IField } from '@sprucelabs/schema'
// @ts-ignore
import fonts from 'cfonts'
import chalk from 'chalk'
// @ts-ignore No definition available
import emphasize from 'emphasize'
import fs from 'fs-extra'
import globby from 'globby'
import inquirer from 'inquirer'
import _ from 'lodash'
import { filter } from 'lodash'
import ora from 'ora'
import ErrorCode from '#spruce/errors/errorCode'
import { FieldDefinition } from '#spruce/schemas/fields/fields.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import SpruceError from '../errors/SpruceError'
import log from '../singletons/log'
import {
	IGeneratedFile,
	IExecutionResults,
	IGraphicsInterface,
	IGraphicsTextEffect,
} from '../types/cli.types'
import namesUtil from '../utilities/names.utility'

let fieldCount = 0
function generateInquirerFieldName() {
	fieldCount++
	return `field-${fieldCount}`
}

/** Remove effects cfonts does not support */
function filterEffectsForCFonts(effects: IGraphicsTextEffect[]) {
	return filter(
		effects,
		(effect) =>
			[
				IGraphicsTextEffect.SpruceHeader,
				IGraphicsTextEffect.Reset,
				IGraphicsTextEffect.Bold,
				IGraphicsTextEffect.Dim,
				IGraphicsTextEffect.Italic,
				IGraphicsTextEffect.Underline,
				IGraphicsTextEffect.Inverse,
				IGraphicsTextEffect.Hidden,
				IGraphicsTextEffect.Strikethrough,
				IGraphicsTextEffect.Visible,
			].indexOf(effect) === -1
	)
}

export default class TerminalInterface implements IGraphicsInterface {
	public isPromptActive = false
	public cwd: string
	private loader?: ora.Ora | null

	public constructor(cwd: string) {
		this.cwd = cwd
	}

	public async sendInput(): Promise<void> {
		throw new Error('sendInput not supported on the TerminalInterface!')
	}

	public renderLines(lines: any[], effects?: IGraphicsTextEffect[]) {
		lines.forEach((line) => {
			this.renderLine(line, effects)
		})
	}

	public renderObject(
		object: Record<string, any>,
		effects: IGraphicsTextEffect[] = [IGraphicsTextEffect.Green]
	) {
		this.renderDivider()
		this.renderLine('')
		Object.keys(object).forEach((key) => {
			this.renderLine(
				`${chalk.bold(key)}: ${
					typeof object[key] === 'string'
						? object[key]
						: JSON.stringify(object[key])
				}`,
				effects
			)
		})
		this.renderLine('')
		this.renderDivider()
	}

	public renderSection(options: {
		headline?: string
		lines?: string[]
		object?: Record<string, any>
		headlineEffects?: IGraphicsTextEffect[]
		bodyEffects?: IGraphicsTextEffect[]
		dividerEffects?: IGraphicsTextEffect[]
	}) {
		const {
			headline,
			lines,
			object,
			dividerEffects = [],
			headlineEffects = [IGraphicsTextEffect.Blue, IGraphicsTextEffect.Bold],
			bodyEffects = [IGraphicsTextEffect.Green],
		} = options

		if (headline) {
			this.renderHeadline(`${headline} 🌲🤖`, headlineEffects, dividerEffects)
		}

		if (lines) {
			this.renderLine('')

			this.renderLines(lines, bodyEffects)

			this.renderLine('')
			this.renderDivider(dividerEffects)
		}

		if (object) {
			this.renderObject(object, bodyEffects)
		}

		this.renderLine('')
	}

	public renderDivider(effects?: IGraphicsTextEffect[]) {
		const bar = '=================================================='
		this.renderLine(bar, effects)
	}

	public renderCommandSummary(results: IExecutionResults) {
		const generatedFiles =
			results.files?.filter((f) => f.action === 'generated') ?? []
		const updatedFiles =
			results.files?.filter((f) => f.action === 'updated') ?? []
		const skippedFiles =
			results.files?.filter((f) => f.action === 'skipped') ?? []

		this.renderHero(`${results.actionCode} Finished!`)

		this.renderSection({
			headline: `${results.featureCode}.${results.actionCode} summary`,
			lines: [
				`Generated files: ${generatedFiles.length}`,
				`Updated files: ${updatedFiles.length}`,
				`Skipped files: ${skippedFiles.length}`,
			],
		})

		for (const files of [generatedFiles, updatedFiles, skippedFiles]) {
			if (files.length > 0) {
				this.renderSection({
					headline: `${namesUtil.toPascal(files[0].action)} file summary`,
					lines: files.map((f) => `${f.name}`),
				})
			}
		}
	}

	public createdFileSummary(options: {
		generatedFiles: IGeneratedFile[]
		errors?: (SpruceError | Error)[]
	}) {
		const { generatedFiles, errors = [] } = options

		if (errors.length > 0) {
			this.renderWarning(`But I hit ${errors.length} errors.`)
		}

		generatedFiles.forEach((created, idx) => {
			this.renderLine(
				`${idx + 1}. ${chalk.bold(created.name)}: ${created.path}`
			)
		})
	}

	public renderHeadline(
		message: string,
		effects: IGraphicsTextEffect[] = [
			IGraphicsTextEffect.Blue,
			IGraphicsTextEffect.Bold,
		],
		dividerEffects: IGraphicsTextEffect[] = []
	) {
		const isSpruce = effects.indexOf(IGraphicsTextEffect.SpruceHeader) > -1

		if (isSpruce) {
			fonts.say(message, {
				font: IGraphicsTextEffect.SpruceHeader,
				align: 'left',
				space: false,
				colors: filterEffectsForCFonts(effects),
			})
		} else {
			this.renderDivider(dividerEffects)
			this.renderLine(message, effects)
			this.renderDivider(dividerEffects)
		}
	}

	/** A BIG headline */
	public renderHero(
		message: string,
		effects: IGraphicsTextEffect[] = [
			IGraphicsTextEffect.Blue,
			IGraphicsTextEffect.Bold,
		]
	) {
		fonts.say(message, {
			// Font: 'tiny',
			align: 'center',
			colors: filterEffectsForCFonts(effects),
		})
	}

	public renderHint(message: string) {
		return this.renderLine(`👨‍🏫 ${message}`)
	}

	public renderLine(message: any, effects: IGraphicsTextEffect[] = []) {
		let write: any = chalk
		effects.forEach((effect) => {
			write = write[effect]
		})
		console.log(effects.length > 0 ? write(message) : message)
	}

	public renderWarning(message: string) {
		this.renderLine(`⚠️ ${message}`, [
			IGraphicsTextEffect.Bold,
			IGraphicsTextEffect.Yellow,
		])
	}

	/** Show a simple loader */
	public async startLoading(message?: string) {
		this.stopLoading()
		this.loader = ora({
			text: message,
		}).start()
	}

	/** Hide loader */
	public async stopLoading() {
		this.loader?.stop()
		this.loader = null
	}

	/** Ask the user to confirm something */
	public async confirm(question: string): Promise<boolean> {
		const confirmResult = await inquirer.prompt({
			type: 'confirm',
			name: 'answer',
			message: question,
		})

		return !!confirmResult.answer
	}

	public async waitForEnter(message?: string) {
		this.renderLine('')
		await this.prompt({
			type: FieldType.Text,
			label: `${message ? message + ' ' : ''}${chalk.bgGreenBright.black(
				'hit enter'
			)}`,
		})
		this.renderLine('')
		return
	}

	/** Clear the console */
	public clear() {
		console.clear()
	}

	/** Print some code beautifully */
	public renderCodeSample(code: string) {
		try {
			const colored = emphasize.highlight('js', code).value
			console.log(colored)
		} catch (err) {
			this.renderWarning(err)
		}
	}

	/** Ask the user for something */
	public async prompt<T extends FieldDefinition>(
		definition: T
	): Promise<FieldDefinitionValueType<T>> {
		this.isPromptActive = true
		const name = generateInquirerFieldName()
		const fieldDefinition: FieldDefinition = definition
		const { isRequired, defaultValue, label } = fieldDefinition

		const promptOptions: Record<string, any> = {
			default: defaultValue,
			name,
			message: label,
		}

		// @ts-ignore
		const field = FieldFactory.field('prompt', fieldDefinition)

		// Setup transform and validate
		promptOptions.transformer = (value: string) => {
			return (field as IField<any>).toValueType(value)
		}
		promptOptions.validate = (value: string) => {
			return field.validate(value, {}).length === 0
		}

		switch (fieldDefinition.type) {
			// Map select options to prompt list choices
			case FieldType.Boolean:
				promptOptions.type = 'confirm'
				break

			case FieldType.Select:
				promptOptions.type = fieldDefinition.isArray ? 'checkbox' : 'list'

				promptOptions.choices = fieldDefinition.options.choices.map(
					// @ts-ignore
					(choice) => ({
						name: choice.label,
						value: choice.value,
						checked: _.includes(fieldDefinition.defaultValue, choice.value),
					})
				)

				if (!isRequired) {
					promptOptions.choices.push(new inquirer.Separator())
					promptOptions.choices.push({
						name: 'Cancel',
						value: -1,
					})
				}
				break
			// Directory select
			// File select
			case FieldType.Directory: {
				if (fieldDefinition.isArray) {
					throw new SpruceError({
						code: ErrorCode.NotImplemented,
						friendlyMessage:
							'isArray file field not supported, prompt needs to be rewritten with isArray support',
					})
				}

				const dirPath = path.join(
					fieldDefinition.defaultValue?.path ?? this.cwd,
					'/'
				)

				promptOptions.type = 'file'
				promptOptions.root = dirPath
				promptOptions.onlyShowDir = true

				// Only let people select an actual file
				promptOptions.validate = (value: string) => {
					return fs.existsSync(value) && fs.lstatSync(value).isDirectory()
				}
				// Strip out cwd from the paths while selecting
				promptOptions.transformer = (path: string) => {
					const cleanedPath = path.replace(promptOptions.root, '')
					return cleanedPath.length === 0 ? promptOptions.root : cleanedPath
				}
				break
			}
			case FieldType.File: {
				if (fieldDefinition.isArray) {
					throw new SpruceError({
						code: ErrorCode.NotImplemented,
						friendlyMessage:
							'isArray file field not supported, prompt needs to be rewritten with isArray support',
					})
				}
				const dirPath = path.join(
					fieldDefinition.defaultValue?.path ?? this.cwd,
					'/'
				)

				log.trace(`TerminalUtility filePrompt for directory: ${dirPath}`)

				// Check if directory is empty.
				const files = await globby(`${dirPath}**/*`)

				if (files.length === 0) {
					throw new SpruceError({
						code: ErrorCode.DirectoryEmpty,
						directory: dirPath,
						friendlyMessage: `I wanted to help you select a file, but none exist in ${dirPath}`,
					})
				}

				promptOptions.type = 'file'
				promptOptions.root = dirPath

				// Only let people select an actual file
				promptOptions.validate = (value: string) => {
					return (
						fs.existsSync(value) &&
						!fs.lstatSync(value).isDirectory() &&
						path.extname(value) === '.ts'
					)
				}
				// Strip out cwd from the paths while selecting
				promptOptions.transformer = (path: string) => {
					const cleanedPath = path.replace(promptOptions.root, '')
					return cleanedPath.length === 0 ? promptOptions.root : cleanedPath
				}
				break
			}

			// Defaults to input
			default:
				promptOptions.type = 'input'
		}

		const response = (await inquirer.prompt(promptOptions)) as any
		this.isPromptActive = false
		const result =
			typeof response[name] !== 'undefined'
				? (field as IField<any>).toValueType(response[name])
				: response[name]

		return result
	}

	/** Generic way to handle error */
	public renderError(err: Error) {
		this.stopLoading()

		const message = err.message
		// Remove message from stack so the message is not doubled up
		const stack = err.stack ? err.stack.replace(message, '') : ''
		const stackLines = stack.split('\n')
		this.renderSection({
			headline: message,
			lines: stackLines.splice(0, 100),
			headlineEffects: [IGraphicsTextEffect.Bold, IGraphicsTextEffect.Red],
			dividerEffects: [IGraphicsTextEffect.Red],
			bodyEffects: [IGraphicsTextEffect.Red],
		})

		this.renderLine(
			'You can always run `DEBUG=@sprucelabs/cli spruce [command]` to get debug information'
		)
	}
}
