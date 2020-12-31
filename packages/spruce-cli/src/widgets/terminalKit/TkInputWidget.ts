import chalk from 'chalk'
import terminal_kit from 'terminal-kit'
import { InputWidget, InputWidgetOptions } from '../types/input.types'
import termKitUtil from './termKit.utility'
import TkBaseWidget, { TkWidgetOptions } from './TkBaseWidget'
const termKit = terminal_kit as any

export default class TkInputWidget extends TkBaseWidget implements InputWidget {
	public readonly type = 'input'

	private input: any

	public constructor(
		options: TkWidgetOptions & InputWidgetOptions & { termKitElement: any }
	) {
		super(options)

		const frame = termKitUtil.buildFrame(options, options.parent)

		const { parent, ...rest } = options

		this.input = new termKit.InlineInput({
			parent: parent ? parent.getTermKitElement() : undefined,
			textAttr: { bgColor: 'black', color: 'white' },
			voidAttr: { bgColor: 'black' },
			placeholder: options.placeholder
				? chalk.italic.black(options.placeholder)
				: undefined,
			placeholderHasMarkup: true,
			prompt: {
				content: options.label ? `${options.label} > ` : undefined,
				contentHasMarkup: true,
			},
			cancelable: true,
			...rest,
			...frame,
		})

		this.input.__widget = this
		this.input.on('submit', this.handleSubmit.bind(this))
		this.input.on('cancel', this.handleCancel.bind(this))
	}

	private async handleCancel() {
		await (this as InputWidget).emit('cancel')
	}

	private async handleSubmit() {
		await (this as InputWidget).emit('submit', {
			value: this.getValue(),
		})
	}

	public getValue(): string | undefined {
		return this.input.getValue()
	}

	public setValue(value: string): void {
		this.input.setContent(value)
	}

	public getTermKitElement() {
		return this.input
	}
}
