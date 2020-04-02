import chalk from 'chalk'
import Debug from 'debug'
import {
	FieldType,
	FieldDefinitionMap,
	IFieldDefinition,
	FieldBase
} from '@sprucelabs/schema'
import inquirer from 'inquirer'
// @ts-ignore
import fonts from 'cfonts'
import ora from 'ora'
import AbstractSpruceError from '@sprucelabs/error'
import { omit } from 'lodash'
import emphasize from 'emphasize'

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
	BgWhiteBright = 'bgWhiteBright'
}

/** what prompt() returns if isRequired=true */
type PromptReturnTypeRequired<T extends IFieldDefinition> = Required<
	FieldDefinitionMap[T['type']]
>['value']

/** what prompt() returns if isRequired!==true */
type PromptReturnTypeOptional<
	T extends IFieldDefinition
> = FieldDefinitionMap[T['type']]['value']

const debug = Debug('@sprucelabs/cli')

export default class Terminal {
	private loader?: ora.Ora | null

	/** write a line with various effects applied */
	public writeLn(message: any, effects: ITerminalEffect[] = []) {
		let write: any = chalk
		effects.forEach(effect => {
			write = write[effect]
		})
		console.log(effects.length > 0 ? write(message) : message)
	}

	/** write an array of lines quickly */
	public writeLns(lines: any[], effects?: ITerminalEffect[]) {
		lines.forEach(line => {
			this.writeLn(line, effects)
		})
	}

	/** output an object, one key per line */
	public object(
		object: Record<string, any>,
		effects: ITerminalEffect[] = [ITerminalEffect.Green]
	) {
		this.bar()
		this.writeLn('')
		Object.keys(object).forEach(key => {
			this.writeLn(`${key}: ${JSON.stringify(object[key])}`, effects)
		})
		this.writeLn('')
		this.bar()
	}

	/** a section draws a box around what you are writing */
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
			this.bar(barEffects)
			this.writeLn('')

			this.headline(`${headline} 🌲🤖`, headlineEffects)
			this.writeLn('')
		}

		if (lines) {
			this.writeLn('')
			this.bar(barEffects)

			this.writeLns(lines, bodyEffects)

			this.writeLn('')
			this.bar(barEffects)
		}

		if (object) {
			this.object(object, bodyEffects)
		}

		this.writeLn('')
	}

	/** draw a bar (horizontal ruler) */
	public bar(effects?: ITerminalEffect[]) {
		const bar = '=================================================='
		this.writeLn(bar, effects)
	}

	public headline(
		message: string,
		effects: ITerminalEffect[] = [ITerminalEffect.Blue, ITerminalEffect.Bold]
	) {
		this.bar()
		// this.writeLn(message, effects)
		fonts.say(message, {
			font: 'simple',
			align: 'left',
			colors: omit(effects, [
				ITerminalEffect.Reset,
				ITerminalEffect.Bold,
				ITerminalEffect.Dim,
				ITerminalEffect.Italic,
				ITerminalEffect.Underline,
				ITerminalEffect.Inverse,
				ITerminalEffect.Hidden,
				ITerminalEffect.Strikethrough,
				ITerminalEffect.Visible
			])
		})
		this.bar()
	}

	/** a headline */
	public hero(
		message: string,
		effects: ITerminalEffect[] = [ITerminalEffect.Blue, ITerminalEffect.Bold]
	) {
		// TODO map effects to cfonts
		fonts.say(message, {
			// font: 'tiny',
			align: 'center',
			colors: omit(effects, [
				ITerminalEffect.Reset,
				ITerminalEffect.Bold,
				ITerminalEffect.Dim,
				ITerminalEffect.Italic,
				ITerminalEffect.Underline,
				ITerminalEffect.Inverse,
				ITerminalEffect.Hidden,
				ITerminalEffect.Strikethrough,
				ITerminalEffect.Visible
			])
		})
	}

	/** some helpful info or suggestion */
	public hint(message: string) {
		return this.writeLn(`👨‍🏫 ${message}`)
	}

	/** when outputting something information */
	public info(message: string) {
		if (typeof message !== 'string') {
			debug('Invalid info log')
			debug(message)
			return
		}

		this.writeLn(`🌲🤖 ${message}`, [ITerminalEffect.Cyan])
	}

	/** the user did something wrong, like entered a bad value */
	public warn(message: string) {
		this.writeLn(`⚠️ ${message}`, [
			ITerminalEffect.Bold,
			ITerminalEffect.Yellow
		])
	}

	/** the user did something wrong, like entered a bad value */
	public error(message: string) {
		this.writeLn(`🛑 ${message}`, [ITerminalEffect.Bold, ITerminalEffect.Bold])
	}

	/** something major or a critical information but program will not die */
	public crit(message: string) {
		this.writeLn(`🛑 ${message}`, [ITerminalEffect.Red, ITerminalEffect.Bold])
	}
	/** everything is crashing! */
	public fatal(message: string) {
		this.writeLn(`💥 ${message}`, [ITerminalEffect.Red, ITerminalEffect.Bold])
	}

	/** show a simple loader */
	public async startLoading(message?: string) {
		this.stopLoading()
		this.loader = ora({
			text: message
		}).start()
	}

	/** hide loader */
	public async stopLoading() {
		this.loader?.stop()
		this.loader = null
	}

	/** ask the user to confirm something */
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
			label: message ?? 'Hit enter to continue'
		})
		this.writeLn('')
		return
	}

	/** clear the console */
	public clear() {
		console.clear()
	}

	/** print some code beautifully */
	public codeSample(code: string) {
		try {
			const colored = emphasize.highlight('js', code).value
			console.log(colored)
		} catch (err) {
			this.error(err)
		}
	}

	/** ask the user for something */
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

		const field = FieldBase.field(fieldDefinition)

		// setup transform and validate
		promptOptions.transformer = (value: string) => {
			return field.toValueType(value)
		}
		promptOptions.validate = (value: string) => {
			return field.validate(value).length === 0
		}

		switch (fieldDefinition.type) {
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

			default:
				promptOptions.type = 'input'
		}

		// TODO update method signature to type this properly
		const response = (await inquirer.prompt(promptOptions)) as any
		return response[name]
	}

	/** generic way to handle error */
	public handleError(err: Error) {
		this.stopLoading()

		const message =
			err instanceof AbstractSpruceError ? err.friendlyMessage() : err.message

		this.section({
			headline: message,
			lines: (err.stack || '').split('/n'),
			headlineEffects: [ITerminalEffect.Bold, ITerminalEffect.Red],
			barEffects: [ITerminalEffect.Red],
			bodyEffects: [ITerminalEffect.Red]
		})
	}
}

export const terminal = new Terminal()
