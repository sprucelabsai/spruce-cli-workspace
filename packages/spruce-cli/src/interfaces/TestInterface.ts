import { FieldDefinitionValueType } from '@sprucelabs/schema'
import { FieldDefinition } from '#spruce/schemas/fields/fields.types'
import {
	IGraphicsInterface,
	IExecutionResults,
	IGraphicsTextEffect,
} from '../types/cli.types'

export default class TestInterface implements IGraphicsInterface {
	public renderWarning(
		message: string,
		effects?: IGraphicsTextEffect[] | undefined
	): void {
		this.trackInvocation('renderWarning', { message, effects })
	}
	public renderHint(
		message: string,
		effects?: IGraphicsTextEffect[] | undefined
	): void {
		this.trackInvocation('renderHint', { message, effects })
	}
	private promptResolver?: (
		input: FieldDefinitionValueType<FieldDefinition>
	) => void | undefined

	private confirmResolver?: (pass: boolean) => void | undefined

	public invocations: { command: string; options?: any }[] = []

	private trackInvocation(command: string, options?: any) {
		this.invocations.push({ command, options })
	}

	public async sendInput(input: string): Promise<void> {
		this.trackInvocation('sendInput', input)

		if (this.promptResolver) {
			const resolver = this.promptResolver
			this.promptResolver = undefined

			resolver(input)
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
		headlineEffects?: IGraphicsTextEffect[]
		dividerEffects?: IGraphicsTextEffect[]
		bodyEffects?: IGraphicsTextEffect[]
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

	public renderCommandSummary(results: IExecutionResults): void {
		this.trackInvocation('renderCommandSummary', results)
	}

	public renderHero(
		message: string,
		effects?: IGraphicsTextEffect[] | undefined
	): void {
		this.trackInvocation('renderHero', { message, effects })
	}

	public renderHeadline(
		message: string,
		effects: IGraphicsTextEffect[],
		dividerEffects: IGraphicsTextEffect[]
	): void {
		this.trackInvocation('renderHeadline', { message, effects, dividerEffects })
	}

	public renderDivider(effects?: IGraphicsTextEffect[] | undefined): void {
		this.trackInvocation('renderDivider', effects)
	}

	public renderLine(
		message: string,
		effects?: IGraphicsTextEffect[] | undefined
	): void {
		this.trackInvocation('renderLine', { message, effects })
	}

	public renderLines(
		messages: string[],
		effects?: IGraphicsTextEffect[] | undefined
	): void {
		this.trackInvocation('renderLines', { messages, effects })
	}

	public async prompt<T extends FieldDefinition>(definition: T) {
		this.trackInvocation('prompt', definition)

		return new Promise<FieldDefinitionValueType<FieldDefinition>>((resolve) => {
			this.promptResolver = resolve
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
		await Promise.resolve()
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
}
