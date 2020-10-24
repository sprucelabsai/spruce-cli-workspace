import { FieldDefinitionValueType } from '@sprucelabs/schema'
import { FieldDefinition } from '#spruce/schemas/fields/fields.types'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import { IFeatureActionExecuteResponse } from '../features/features.types'

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

	/** Spruce header style */
	SpruceHeader = 'shade',
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

export type GeneratedFile = SpruceSchemas.SpruceCli.v2020_07_22.IGeneratedFile
export type GeneratedDir = SpruceSchemas.SpruceCli.v2020_07_22.IGeneratedDir

export type GeneratedFileOrDir = SpruceSchemas.SpruceCli.v2020_07_22.IWatcherDidDetectChangesEmitPayload['changes'][number]

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
