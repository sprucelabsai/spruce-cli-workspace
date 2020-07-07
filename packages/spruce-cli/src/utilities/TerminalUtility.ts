import path from 'path'
import {
	FieldType,
	FieldDefinition,
	FieldFactory,
	FieldDefinitionValueType
} from '@sprucelabs/schema'
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
import { ErrorCode } from '#spruce/errors/codes.types'
import SpruceError from '../errors/SpruceError'
import log from '../lib/log'
import AbstractUtility from './AbstractUtility'

let fieldCount = 0
function generateInquirerFieldName() {
	fieldCount++
	return `field-${fieldCount}`
}

export enum ITerminalEffect {
	Reset = 'reset',
	Bold = 'bold',
	Dim = 'dim',
	Italic = 'italic',
	Underline = 'underline',
	Inverse = 'inverse',
	Hidden = 'hidden',
	Strikethrough = 'strikethrough',
	Visible = 'visible',
	Black = 'black',
	Red = 'red',
	Green = 'green',
	Yellow = 'yellow',
	Blue = 'blue',
	Magenta = 'magenta',
	Cyan = 'cyan',
	White = 'white',
	Gray = 'gray',
	Grey = 'grey',
	BlackBright = 'blackBright',
	RedBright = 'redBright',
	GreenBright = 'greenBright',
	YellowBright = 'yellowBright',
	BlueBright = 'blueBright',
	MagentaBright = 'magentaBright',
	CyanBright = 'cyanBright',
	WhiteBright = 'whiteBright',
	BgBlack = 'bgBlack',
	BgRed = 'bgRed',
	BgGreen = 'bgGreen',
	BgYellow = 'bgYellow',
	BgBlue = 'bgBlue',
	BgMagenta = 'bgMagenta',
	BgCyan = 'bgCyan',
	BgWhite = 'bgWhite',
	BgBlackBright = 'bgBlackBright',
	BgRedBright = 'bgRedBright',
	BgGreenBright = 'bgGreenBright',
	BgYellowBright = 'bgYellowBright',
	BgBlueBright = 'bgBlueBright',
	BgMagentaBright = 'bgMagentaBright',
	BgCyanBright = 'bgCyanBright',
	BgWhiteBright = 'bgWhiteBright',

	/** Spruce header style */
	SpruceHeader = 'shade'
}

/** Remove effects cfonts does not support */
function filterEffectsForCFonts(effects: ITerminalEffect[]) {
	return filter(
		effects,
		effect =>
			[
				ITerminalEffect.SpruceHeader,
				ITerminalEffect.Reset,
				ITerminalEffect.Bold,
				ITerminalEffect.Dim,
				ITerminalEffect.Italic,
				ITerminalEffect.Underline,
				ITerminalEffect.Inverse,
				ITerminalEffect.Hidden,
				ITerminalEffect.Strikethrough,
				ITerminalEffect.Visible
			].indexOf(effect) === -1
	)
}

export interface ICreatedFile {
	name: string
	path: string
}

export default class TerminalUtility extends AbstractUtility {
	public isPromptActive = false

	private loader?: ora.Ora | null

	/** Write a line with various effects applied */
	public writeLn(message: any, effects: ITerminalEffect[] = []) {
		let write: any = chalk
		effects.forEach(effect => {
			write = write[effect]
		})
		console.log(effects.length > 0 ? write(message) : message)
	}

	/** Write an array of lines quickly */
	public writeLns(lines: any[], effects?: ITerminalEffect[]) {
		lines.forEach(line => {
			this.writeLn(line, effects)
		})
	}

	/** Output an object, one key per line */
	public object(
		object: Record<string, any>,
		effects: ITerminalEffect[] = [ITerminalEffect.Green]
	) {
		this.bar()
		this.writeLn('')
		Object.keys(object).forEach(key => {
			this.writeLn(
				`${chalk.bold(key)}: ${
					typeof object[key] === 'string'
						? object[key]
						: JSON.stringify(object[key])
				}`,
				effects
			)
		})
		this.writeLn('')
		this.bar()
	}

	/** A section draws a box around what you are writing */
	public section(options: {
		headline?: string
		lines?: string[]
		object?: Record<string, any>
		headlineEffects?: ITerminalEffect[]
		bodyEffects?: ITerminalEffect[]
		barEffects?: ITerminalEffect[]
	}) {
		const {
			headline,
			lines,
			object,
			barEffects = [],
			headlineEffects = [ITerminalEffect.Blue, ITerminalEffect.Bold],
			bodyEffects = [ITerminalEffect.Green]
		} = options

		if (headline) {
			this.writeLn('')
			this.writeLn('')

			this.headline(`${headline} 🌲🤖`, headlineEffects, barEffects)
			this.writeLn('')
		}

		if (lines) {
			this.writeLn('')

			this.writeLns(lines, bodyEffects)

			this.writeLn('')
			this.bar(barEffects)
		}

		if (object) {
			this.object(object, bodyEffects)
		}

		this.writeLn('')
	}

	/** Draw a bar (horizontal ruler) */
	public bar(effects?: ITerminalEffect[]) {
		const bar = '=================================================='
		this.writeLn(bar, effects)
	}

	public createdFileSummary(options: {
		createdFiles: ICreatedFile[]
		errors?: (SpruceError | Error)[]
	}) {
		const { createdFiles, errors = [] } = options
		this.info(`All done 👊. I created ${createdFiles.length} files.`)
		if (errors.length > 0) {
			this.warn(`But I hit ${errors.length} errors.`)
		}

		this.bar()
		createdFiles.forEach((created, idx) => {
			this.info(`${idx + 1}. ${chalk.bold(created.name)}: ${created.path}`)
		})
	}

	/** I big headline */
	public headline(
		message: string,
		effects: ITerminalEffect[] = [ITerminalEffect.Blue, ITerminalEffect.Bold],
		barEffects: ITerminalEffect[] = []
	) {
		const isSpruce = effects.indexOf(ITerminalEffect.SpruceHeader) > -1

		if (isSpruce) {
			fonts.say(message, {
				font: ITerminalEffect.SpruceHeader,
				align: 'left',
				space: false,
				colors: filterEffectsForCFonts(effects)
			})
		} else {
			this.bar(barEffects)
			this.writeLn(message, effects)
			this.bar(barEffects)
		}
	}

	/** A headline */
	public hero(
		message: string,
		effects: ITerminalEffect[] = [ITerminalEffect.Blue, ITerminalEffect.Bold]
	) {
		// TODO map effects to cfonts
		fonts.say(message, {
			// Font: 'tiny',
			align: 'center',
			colors: filterEffectsForCFonts(effects)
		})
	}

	/** Some helpful info or suggestion */
	public hint(message: string) {
		return this.writeLn(`👨‍🏫 ${message}`)
	}

	/** When outputting something information */
	public info(message: string) {
		if (typeof message !== 'string') {
			log.debug('Invalid info log')
			log.debug(message)
			return
		}

		this.writeLn(`🌲🤖 ${message}`, [ITerminalEffect.Cyan])
	}

	/** The user did something wrong, like entered a bad value */
	public warn(message: string) {
		this.writeLn(`⚠️ ${message}`, [
			ITerminalEffect.Bold,
			ITerminalEffect.Yellow
		])
	}

	/** The user did something wrong, like entered a bad value */
	public error(message: string) {
		this.writeLn(`🛑 ${message}`, [ITerminalEffect.Bold, ITerminalEffect.Red])
	}

	/** Something major or a critical information but program will not die */
	public crit(message: string) {
		this.writeLn(`🛑 ${message}`, [ITerminalEffect.Red, ITerminalEffect.Bold])
	}
	/** Everything is crashing! */
	public fatal(message: string) {
		this.writeLn(`💥 ${message}`, [ITerminalEffect.Red, ITerminalEffect.Bold])
	}

	/** Show a simple loader */
	public async startLoading(message?: string) {
		this.stopLoading()
		this.loader = ora({
			text: message
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
			message: question
		})

		return !!confirmResult.answer
	}

	public async wait(message?: string) {
		this.writeLn('')
		await this.prompt({
			type: FieldType.Text,
			label: `${message ? message + ' ' : ''}${chalk.bgGreenBright.black(
				'hit enter'
			)}`
		})
		this.writeLn('')
		return
	}

	/** Clear the console */
	public clear() {
		console.clear()
	}

	/** Print some code beautifully */
	public codeSample(code: string) {
		try {
			const colored = emphasize.highlight('js', code).value
			console.log(colored)
		} catch (err) {
			this.error(err)
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
			message: label
		}

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

				promptOptions.choices = fieldDefinition.options.choices.map(choice => ({
					name: choice.label,
					value: choice.value,
					checked: _.includes(fieldDefinition.defaultValue, choice.value)
				}))

				if (!isRequired) {
					promptOptions.choices.push(new inquirer.Separator())
					promptOptions.choices.push({
						name: 'Cancel',
						value: -1
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
							'isArray file field not supported, prompt needs to be rewritten with isArray support'
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
							'isArray file field not supported, prompt needs to be rewritten with isArray support'
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
						friendlyMessage: `I wanted to help you select a file, but none exist in ${dirPath}`
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
	public handleError(err: Error) {
		this.stopLoading()

		const message = err.message
		// Remove message from stack so the message is not doubled up
		const stack = err.stack ? err.stack.replace(message, '') : ''
		const stackLines = stack.split('\n')
		this.section({
			headline: message,
			lines: stackLines.splice(0, 100),
			headlineEffects: [ITerminalEffect.Bold, ITerminalEffect.Red],
			barEffects: [ITerminalEffect.Red],
			bodyEffects: [ITerminalEffect.Red]
		})

		this.info(
			'You can always run `DEBUG=@sprucelabs/cli spruce [command]` to get debug information'
		)
	}
}

export const terminal = new TerminalUtility({ cwd: process.cwd() })
