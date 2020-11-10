import terminal_kit from 'terminal-kit'
import { WindowWidget, WindowWidgetOptions } from '../widgets.types'
import TkBaseWidget, { TkWidgetOptions } from './TkBaseWidget'
const termKit = terminal_kit as any

export default class TkWindowWidget
	extends TkBaseWidget
	implements WindowWidget {
	public readonly type = 'window'

	private document: any

	public constructor(options: TkWidgetOptions & WindowWidgetOptions) {
		super(options)
		//@ts-ignore
		this.document = this.term.createDocument({
			palette: new termKit.Palette(),
		})

		this.document.eventSource.on('resize', () => {
			this.handleParentResize()
		})
	}

	protected handleParentResize() {
		this.sizeLockedChildren()
	}

	public setTitle(title: string) {
		this.term.windowTitle(title)
	}

	public hideCursor() {
		this.term.hideCursor(true)
	}

	public showCursor() {
		this.term.hideCursor(false)
	}

	public getFrame() {
		return {
			left: 0,
			top: 0,
			width: this.document.inputWidth,
			height: this.document.inputHeight,
		}
	}

	public getTermKitElement() {
		return this.document
	}

	public destroy() {
		this.showCursor()
		this.term.styleReset()
		this.term.grabInput(false, true)
		this.term(`\n`)
	}
}
