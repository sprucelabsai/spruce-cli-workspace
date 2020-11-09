import terminal_kit, { Terminal } from 'terminal-kit'
import TkLayoutCellWidget from './terminalKit/TkLayoutCellWidget'
import TkLayoutWidget from './terminalKit/TkLayoutWidget'
import TkProgressBarWidget from './terminalKit/TkProgressBarWidget'
import TkTextWidget from './terminalKit/TkTextWidget'
import TkWindowWidget from './terminalKit/TkWindowWidget'
import { FactoryOptions, WidgetRegistry, WidgetType } from './widgets.types'
const termKit = terminal_kit as any

const widgetRegistry = {
	window: TkWindowWidget,
	text: TkTextWidget,
	layout: TkLayoutWidget,
	layoutCell: TkLayoutCellWidget,
	progressBar: TkProgressBarWidget,
}

export default class WidgetFactory {
	private term: Terminal
	public constructor() {
		this.term = termKit.terminal
	}

	public Widget<T extends WidgetType>(
		type: T,
		options: FactoryOptions<T>
	): WidgetRegistry[T] {
		const Class = widgetRegistry[type]

		//@ts-ignore
		const instance = new Class({ ...options, term: this.term })

		return instance as WidgetRegistry[T]
	}
}
