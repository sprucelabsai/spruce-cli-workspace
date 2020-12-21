import { FieldDefinitionValueType } from '@sprucelabs/schema'
import { FieldDefinitions } from '#spruce/schemas/fields/fields.types'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import { FeatureActionResponse } from '../features/features.types'

export enum GraphicsTextEffect {
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

	SpruceHeader = 'shade',
}

export interface ProgressBarOptions {
	width?: number
	showPercent?: boolean
	showEta?: boolean
	totalItems?: number
	title?: string
	renderInline?: boolean
}

export interface ProgressBarUpdateOptions {
	progress: number | null
	totalItems?: number
	title?: string
}

export interface ImageDimensions {
	width?: number
	height?: number
}

export interface GraphicsInterface {
	renderSection(options: {
		headline?: string
		lines?: string[]
		object?: Record<string, any>
		headlineEffects?: GraphicsTextEffect[]
		bodyEffects?: GraphicsTextEffect[]
		dividerEffects?: GraphicsTextEffect[]
	}): void
	renderObject(obj: any): void
	renderError(err: Error): void
	renderCodeSample(code: string): void
	renderCommandSummary(results: ExecutionResults): void
	renderHero(message: string, effects?: GraphicsTextEffect[]): void
	renderHeadline(
		message: string,
		effects?: GraphicsTextEffect[],
		dividerEffects?: GraphicsTextEffect[]
	): void
	renderDivider(effects?: GraphicsTextEffect[]): void
	renderLine(message: string, effects?: GraphicsTextEffect[]): void
	renderLines(messages: string[], effects?: GraphicsTextEffect[]): void
	renderWarning(message: string, effects?: GraphicsTextEffect[]): void
	renderHint(message: string, effects?: GraphicsTextEffect[]): void
	renderImage(path: string, options?: ImageDimensions): Promise<void>
	prompt<T extends FieldDefinitions>(
		definition: T
	): Promise<FieldDefinitionValueType<T>>

	sendInput(message: string): Promise<void>

	startLoading(message?: string): void
	stopLoading(): void

	renderProgressBar(options: ProgressBarOptions): void
	updateProgressBar(options: ProgressBarUpdateOptions): void
	removeProgressBar(): void

	waitForEnter(message?: string): Promise<void>
	confirm(question: string): Promise<boolean>

	getCursorPosition(): Promise<{ x: number; y: number } | null>
	moveCursorTo(x: number, y: number): void

	clear(): void
	clearBelowCursor(): void
}

export type GeneratedFile = SpruceSchemas.SpruceCli.v2020_07_22.GeneratedFile
export type GeneratedDir = SpruceSchemas.SpruceCli.v2020_07_22.GeneratedDir

export type GeneratedFileOrDir = SpruceSchemas.SpruceCli.v2020_07_22.WatcherDidDetectChangesEmitPayload['changes'][number]

export interface NpmPackage {
	name: string
	version?: string
	isDev?: boolean
}

export interface ExecutionResults extends FeatureActionResponse {
	featureCode: string
	actionCode: string
	headline: string
}

type Skill = Omit<SpruceSchemas.Spruce.v2020_07_22.Skill, 'creators'>

export type CurrentSkill = Partial<Skill> & {
	name: string
	isRegistered: boolean
	namespacePascal: string
}

export type RegisteredSkill = Omit<
	SpruceSchemas.Spruce.v2020_07_22.Skill,
	'creators'
>
