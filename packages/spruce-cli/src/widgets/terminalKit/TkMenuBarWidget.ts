import terminal_kit from 'terminal-kit'
const termKit = terminal_kit as any
import {
	MenuBarWidget,
	MenuBarWidgetItem,
	MenuBarWidgetOptions,
} from '../types/menuBar.types'
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
			buttonFocusAttr: { bgColor: 'gray' },
			...frame,
		})

		this.calculateSizeLockDeltas()

		this.menu.__widget = this
		this.menu.on('submit', this.handleMenuSubmit.bind(this))
	}

	public setTextForItem(value: string, text: string): void {
		const buttonItem = this.menu.buttons.find(
			(it: any) => it.def.value === value
		)

		if (!buttonItem) {
			throw new Error(`No menu item with value of ${value}`)
		}

		buttonItem.setContent(this.buildItemText(text), true)
	}

	private handleMenuSubmit(value: string) {
		void (this as MenuBarWidget).emit('select', { value })
	}

	public getTermKitElement() {
		return this.menu
	}

	private mapItemsToTkItems(items: MenuBarWidgetItem[]) {
		return items.map((item) => ({
			value: item.value,
			content: this.buildItemText(item.label),
			topSubmit: !item.items || item.items.length === 0,
		}))
	}

	private buildItemText(text: string): string {
		return ` ${text} `
	}
}
