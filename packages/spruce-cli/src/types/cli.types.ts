import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import { FeatureActionResponse } from '../features/features.types'
import { GraphicsInterface as IGraphicsInterface } from './graphicsInterface.types'

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

	SpruceHeader = 'tiny',
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

export interface GraphicsInterface extends IGraphicsInterface {
	renderCommandSummary(results: ExecutionResults): void
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

export type UpgradeMode = SpruceSchemas.SpruceCli.v2020_07_22.UpgradeSkillAction['upgradeMode']

export type FileDescription = {
	path: string
	description: string
	shouldOverwriteWhenChanged: boolean
	confirmPromptOnFirstWrite?: string
}
