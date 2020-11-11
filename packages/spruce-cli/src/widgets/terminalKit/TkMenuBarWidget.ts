import terminal_kit from 'terminal-kit'
const termKit = terminal_kit as any
import {
	MenuBarWidget,
	MenuBarWidgetItem,
	MenuBarWidgetOptions,
} from '../widgets.types'
import termKitUtil from './termKit.utility'
import TkBaseWidget, { TkWidgetOptions } from './TkBaseWidget'

export default class TkMenuBarWidget
	extends TkBaseWidget
	implements MenuBarWidget {
	public readonly type = 'menuBar'

	private menu: any

	public constructor(options: TkWidgetOptions & MenuBarWidgetOptions) {
		super(options)

		const frame = termKitUtil.buildFrame(options, options.parent)

		this.menu = new termKit.DropDownMenu({
			parent: options.parent.getTermKitElement(),
			separator: '|',
			items: this.mapItemsToTkItems(options.items),
			...frame,
		})

		this.calculateSizeLockDeltas()
	}

	public getTermKitElement() {
		return this.menu
	}

	public mapItemsToTkItems(items: MenuBarWidgetItem[]) {
		return items.map((item) => ({
			value: item.value,
			content: ` ${item.label} `,
		}))
	}
}
