import { FieldDefinitionValueType } from '@sprucelabs/schema'
import { FieldDefinitions } from '#spruce/schemas/fields/fields.types'
import {
	GraphicsTextEffect,
	ImageDimensions,
	ProgressBarOptions,
	ProgressBarUpdateOptions,
} from './cli.types'

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
