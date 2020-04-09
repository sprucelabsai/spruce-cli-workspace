import chalk from 'chalk'
import {
	FieldType,
	FieldDefinitionMap,
	IFieldDefinition,
	BaseField
} from '@sprucelabs/schema'
import inquirer from 'inquirer'
// @ts-ignore
import fonts from 'cfonts'
import ora from 'ora'
import { filter } from 'lodash'
// @ts-ignore
import emphasize from 'emphasize'
import AbstractUtility from './AbstractUtility'
import log from '@sprucelabs/log'
import fs from 'fs-extra'
import path from 'path'

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

/** What prompt() returns if isRequired=true */
type PromptReturnTypeRequired<T extends IFieldDefinition> = Required<
	FieldDefinitionMap[T['type']]
>['value']

/** What prompt() returns if isRequired!==true */
type PromptReturnTypeOptional<
	T extends IFieldDefinition
> = FieldDefinitionMap[T['type']]['value']

export default class TerminalUtility extends AbstractUtility {
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
		this.writeLn(`🛑 ${message}`, [ITerminalEffect.Bold, ITerminalEffect.Bold])
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
			text: `${message}\n`
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
	public async prompt<T extends IFieldDefinition>(
		definition: T
	): Promise<
		T['isRequired'] extends true
			? PromptReturnTypeRequired<T>
			: PromptReturnTypeOptional<T>
	> {
		const name = generateInquirerFieldName()
		const fieldDefinition: IFieldDefinition = definition
		const { isRequired, defaultValue, label } = fieldDefinition

		const promptOptions: Record<string, any> = {
			default: defaultValue,
			name,
			message: `${label}:`
		}

		const field = BaseField.field(fieldDefinition)

		// Setup transform and validate
		promptOptions.transformer = (value: string) => {
			return field.toValueType(value)
		}
		promptOptions.validate = (value: string) => {
			return field.validate(value).length === 0
		}

		switch (fieldDefinition.type) {
			// Map select options to prompt list choices
			case FieldType.Select:
				promptOptions.type = 'list'

				promptOptions.choices = fieldDefinition.options.choices.map(choice => ({
					name: choice.label,
					value: choice.value
				}))

				if (!isRequired) {
					promptOptions.choices.push(new inquirer.Separator())
					promptOptions.choices.push({
						name: 'Cancel',
						value: -1
					})
				}
				break
			// File select
			case FieldType.File:
				promptOptions.type = 'file'
				promptOptions.root = path.join(defaultValue ?? this.cwd, '/')

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

			// Defaults to input
			default:
				promptOptions.type = 'input'
		}

		// TODO update method signature to type this properly
		const response = (await inquirer.prompt(promptOptions)) as any
		return response[name]
	}

	/** Generic way to handle error */
	public handleError(err: Error) {
		this.stopLoading()

		const message = err.message
		// Remove message from stack so the message is not doubled up
		const stack = err.stack ? err.stack.replace(message, '') : ''

		this.section({
			headline: message,
			lines: stack.split('/n'),
			headlineEffects: [ITerminalEffect.Bold, ITerminalEffect.Red],
			barEffects: [ITerminalEffect.Red],
			bodyEffects: [ITerminalEffect.Red]
		})
	}
}

export const terminal = new TerminalUtility({ cwd: process.cwd() })
