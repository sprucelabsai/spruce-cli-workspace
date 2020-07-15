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
	presentSection(options: {
		headline?: string
		lines?: string[]
		object?: Record<string, any>
		headlineEffects?: IGraphicsTextEffect[]
		bodyEffects?: IGraphicsTextEffect[]
		dividerEffects?: IGraphicsTextEffect[]
	}): void

	presentObject(obj: any): void
	presentError(err: Error): void
	presentCodeSample(code: string): void
	presentExecutionSummary(results: IExecutionResults): void
	presentHero(message: string, effects?: IGraphicsTextEffect[]): void
	presentHeadline(
		message: string,
		effects: IGraphicsTextEffect[],
		dividerEffects: IGraphicsTextEffect[]
	): void

	presentDivider(effects?: IGraphicsTextEffect[]): void

	prompt<T extends FieldDefinition>(
		definition: T
	): Promise<FieldDefinitionValueType<T>>

	startLoading(message?: string): void
	stopLoading(): void

	waitForEnter(message?: string): Promise<void>
	confirm(question: string): Promise<boolean>
	clear(): void
}

export enum WriteMode {
	Throw = 'throw',
	Overwrite = 'overwrite',
	Skip = 'skip',
}

export enum AuthedAs {
	User = 'user',
	Skill = 'skill',
}

export interface IGeneratedFile {
	name: string
	path: string
	description: string
	action: 'skipped' | 'generated' | 'updated'
}

export interface INpmPackage {
	name: string
	/** Defaults to "latest" */
	version?: string
	/** Whether to install this in "devDependencies" */
	isDev?: boolean
}

export interface IExecutionResults extends IFeatureActionExecuteResponse {
	featureCode: string
	actionCode: string
}
