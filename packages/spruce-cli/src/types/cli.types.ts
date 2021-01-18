import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import { FeatureActionResponse } from '../features/features.types'
import { GraphicsInterface as IGraphicsInterface } from './graphicsInterface.types'

export interface GraphicsInterface extends IGraphicsInterface {
	renderCommandSummary(results: ExecutionResults): void
	getCursorPosition(): Promise<{ x: number; y: number } | null>
	moveCursorTo(x: number, y: number): void
	clearBelowCursor(): void
	clear(): void
	waitForEnter(message?: string): Promise<void>
	sendInput(message: string): Promise<void>
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
