import { FieldDefinitionValueType } from '@sprucelabs/schema'
import { FieldDefinition } from '#spruce/schemas/fields/fields.types'
import {
	GraphicsInterface,
	ExecutionResults,
	GraphicsTextEffect,
	ProgressBarOptions,
	ProgressBarUpdateOptions,
} from '../types/cli.types'

export default class TestInterface implements GraphicsInterface {
	public invocations: { command: string; options?: any }[] = []
	private promptResolver?: (
		input: FieldDefinitionValueType<FieldDefinition>
	) => void | undefined

	private confirmResolver?: (pass: boolean) => void | undefined
	private waitForEnterResolver?: () => void | undefined

	private promptDefaultValue: any

	public renderWarning(
		message: string,
		effects?: GraphicsTextEffect[] | undefined
	): void {
		this.trackInvocation('renderWarning', { message, effects })
	}
	public renderHint(
		message: string,
		effects?: GraphicsTextEffect[] | undefined
	): void {
		this.trackInvocation('renderHint', { message, effects })
	}

	private trackInvocation(command: string, options?: any) {
		this.invocations.push({ command, options })
	}

	public isWaitingForInput() {
		return !!(
			this.promptResolver ||
			this.confirmResolver ||
			this.waitForEnterResolver
		)
	}

	public reset() {
		this.promptResolver = undefined
		this.confirmResolver = undefined
		this.waitForEnterResolver = undefined
	}

	public lastInvocation() {
		return this.invocations[this.invocations.length - 1]
	}

	public async sendInput(input: string): Promise<void> {
		this.trackInvocation('sendInput', input)

		if (this.waitForEnterResolver) {
			const resolver = this.waitForEnterResolver
			this.waitForEnterResolver = undefined

			resolver()
		} else if (this.promptResolver) {
			const resolver = this.promptResolver
			this.promptResolver = undefined

			resolver(input !== '\n' && input !== '' ? input : this.promptDefaultValue)
		} else if (this.confirmResolver) {
			const resolver = this.confirmResolver
			this.confirmResolver = undefined

			resolver(input.length === 0 || input.toLowerCase() === 'y')
		} else {
			throw new Error('Sent input before prompted for input')
		}

		return new Promise((resolve) => {
			setTimeout(resolve, 50)
		})
	}

	public renderSection(options: {
		headline: string
		lines?: string[] | string[]
		headlineEffects?: GraphicsTextEffect[]
		dividerEffects?: GraphicsTextEffect[]
		bodyEffects?: GraphicsTextEffect[]
		object?: any
	}): void {
		this.trackInvocation('renderSection', options)
	}

	public renderObject(obj: any): void {
		this.trackInvocation('renderObject', obj)
	}

	public renderError(err: Error): void {
		this.trackInvocation('renderError', err)
	}

	public renderCodeSample(code: string): void {
		this.trackInvocation('renderCodeSample', code)
	}

	public renderCommandSummary(results: ExecutionResults): void {
		this.trackInvocation('renderCommandSummary', results)
	}

	public renderHero(
		message: string,
		effects?: GraphicsTextEffect[] | undefined
	): void {
		this.trackInvocation('renderHero', { message, effects })
	}

	public renderHeadline(
		message: string,
		effects: GraphicsTextEffect[],
		dividerEffects: GraphicsTextEffect[]
	): void {
		this.trackInvocation('renderHeadline', { message, effects, dividerEffects })
	}

	public renderDivider(effects?: GraphicsTextEffect[] | undefined): void {
		this.trackInvocation('renderDivider', effects)
	}

	public renderLine(
		message: string,
		effects?: GraphicsTextEffect[] | undefined
	): void {
		this.trackInvocation('renderLine', { message, effects })
	}

	public renderLines(
		messages: string[],
		effects?: GraphicsTextEffect[] | undefined
	): void {
		this.trackInvocation('renderLines', { messages, effects })
	}

	public async prompt<T extends FieldDefinition>(definition: T) {
		this.trackInvocation('prompt', definition)

		if (this.promptResolver) {
			throw new Error(
				'Tried to double prompt. Try this.term.sendInput() before calling prompt next.'
			)
		}

		return new Promise<FieldDefinitionValueType<FieldDefinition>>((resolve) => {
			this.promptResolver = resolve
			this.promptDefaultValue = definition.defaultValue
		})
	}

	public startLoading(message?: string | undefined): void {
		this.trackInvocation('startLoading', message)
	}

	public stopLoading(): void {
		this.trackInvocation('stopLoading')
	}

	public async waitForEnter(message?: string | undefined): Promise<void> {
		this.trackInvocation('waitForEnter', message)
		return new Promise((resolve) => {
			this.waitForEnterResolver = resolve
		})
	}

	public confirm(question: string): Promise<boolean> {
		this.trackInvocation('confirm', question)
		return new Promise((resolve) => {
			this.confirmResolver = resolve
		})
	}

	public clear(): void {
		this.trackInvocation('clear')
	}

	public renderProgressBar(options: ProgressBarOptions): void {
		this.trackInvocation('renderProgressBar', options)
	}

	public updateProgressBar(options: ProgressBarUpdateOptions): void {
		this.trackInvocation('updateProgressBar', options)
	}

	public removeProgressBar(): void {
		this.trackInvocation('removeProgressBar')
	}

	public async getCursorPosition(): Promise<{ x: number; y: number } | null> {
		this.trackInvocation('getCursorPosition')
		return { x: 0, y: 0 }
	}

	public moveCursorTo(x: number, y: number): void {
		this.trackInvocation('moveCursorTo', { x, y })
	}

	public clearBelowCursor(): void {
		this.trackInvocation('clearBelowCursor')
	}
}
