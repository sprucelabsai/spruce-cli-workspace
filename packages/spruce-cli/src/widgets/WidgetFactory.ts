import terminal_kit, { Terminal } from 'terminal-kit'
import TkLayoutCellWidget from './terminalKit/TkLayoutCellWidget'
import TkLayoutWidget from './terminalKit/TkLayoutWidget'
import TkMenuBarWidget from './terminalKit/TkMenuBarWidget'
import TkProgressBarWidget from './terminalKit/TkProgressBarWidget'
import TkTextWidget from './terminalKit/TkTextWidget'
import TkWindowWidget from './terminalKit/TkWindowWidget'
import {
	FactoryOptions,
	menuBarEventContract,
	WidgetRegistry,
	WidgetType,
	windowEventContract,
} from './widgets.types'
const termKit = terminal_kit as any

const widgetRegistry = {
	window: TkWindowWidget,
	text: TkTextWidget,
	layout: TkLayoutWidget,
	layoutCell: TkLayoutCellWidget,
	progressBar: TkProgressBarWidget,
	menuBar: TkMenuBarWidget,
}

const contractRegistry = {
	window: windowEventContract,
	text: null,
	layout: null,
	layoutCell: null,
	progressBar: null,
	menuBar: menuBarEventContract,
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
		const instance = new Class({
			...options,
			term: this.term,
			eventContract: contractRegistry[type],
		})

		//@ts-ignore
		return instance
	}
}
