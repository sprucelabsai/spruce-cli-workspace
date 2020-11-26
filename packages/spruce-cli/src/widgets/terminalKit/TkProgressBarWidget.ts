import terminal_kit from 'terminal-kit'
import {
	ProgressBarWidget,
	ProgressBarWidgetOptions,
} from '../types/progressBar.types'
import TkBaseWidget, { TkWidgetOptions } from './TkBaseWidget'
const termKit = terminal_kit as any

export default class TkProgressBarWidget
	extends TkBaseWidget
	implements ProgressBarWidget {
	public readonly type = 'progressBar'

	private bar: any

	public constructor(options: TkWidgetOptions & ProgressBarWidgetOptions) {
		super(options)

		const { parent, label, left, top, progress, ...barOptions } = options

		this.bar = new termKit.Bar({
			parent: parent?.getTermKitElement(),
			content: label ? ` ${label}` : undefined,
			x: left,
			y: top,
			value: progress,
			...barOptions,
		})

		this.calculateSizeLockDeltas()
	}

	public setProgress(progress: number): void {
		this.bar.setValue(progress)
	}

	public setLabel(label?: string): void {
		this.bar.setContent(label ? ` ${label}` : '')
	}

	public getTermKitElement() {
		return this.bar
	}
}
