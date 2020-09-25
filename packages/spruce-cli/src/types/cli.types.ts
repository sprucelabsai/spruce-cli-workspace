import { FieldDefinitionValueType } from '@sprucelabs/schema'
import { FieldDefinition } from '#spruce/schemas/fields/fields.types'
import { IFeatureActionExecuteResponse } from '../features/features.types'

export enum IGraphicsTextEffect {
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
	SpruceHeader = 'shade',
}

export interface IGraphicsInterface {
	renderSection(options: {
		headline?: string
		lines?: string[]
		object?: Record<string, any>
		headlineEffects?: IGraphicsTextEffect[]
		bodyEffects?: IGraphicsTextEffect[]
		dividerEffects?: IGraphicsTextEffect[]
	}): void
	renderObject(obj: any): void
	renderError(err: Error): void
	renderCodeSample(code: string): void
	renderCommandSummary(results: ExecutionResults): void
	renderHero(message: string, effects?: IGraphicsTextEffect[]): void
	renderHeadline(
		message: string,
		effects?: IGraphicsTextEffect[],
		dividerEffects?: IGraphicsTextEffect[]
	): void
	renderDivider(effects?: IGraphicsTextEffect[]): void
	renderLine(message: string, effects?: IGraphicsTextEffect[]): void
	renderLines(messages: string[], effects?: IGraphicsTextEffect[]): void
	renderWarning(message: string, effects?: IGraphicsTextEffect[]): void
	renderHint(message: string, effects?: IGraphicsTextEffect[]): void

	prompt<T extends FieldDefinition>(
		definition: T
	): Promise<FieldDefinitionValueType<T>>

	sendInput(message: string): Promise<void>

	startLoading(message?: string): void
	stopLoading(): void

	waitForEnter(message?: string): Promise<void>
	confirm(question: string): Promise<boolean>
	clear(): void
}

export enum AuthedAs {
	User = 'user',
	Skill = 'skill',
}

export interface GeneratedFile {
	name: string
	path: string
	description?: string
	action: 'skipped' | 'generated' | 'updated' | 'deleted'
}

export interface GeneratedDir extends GeneratedFile {
	isDir: true
}

export type GeneratedFileOrDir = GeneratedFile | GeneratedDir

export interface NpmPackage {
	name: string
	/** Defaults to "latest" */
	version?: string
	/** Whether to install this in "devDependencies" */
	isDev?: boolean
}

export interface ExecutionResults extends IFeatureActionExecuteResponse {
	featureCode: string
	actionCode: string
	headline: string
}
