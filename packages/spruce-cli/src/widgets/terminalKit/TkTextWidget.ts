import terminal_kit from 'terminal-kit'
import widgetUtil from '../widget.utilities'
import { TextWidget, TextWidgetOptions, WidgetFrame } from '../widgets.types'
import termKitUtil from './termKit.utility'
import TkBaseWidget, { TkWidgetOptions } from './TkBaseWidget'
const termKit = terminal_kit as any

export default class TkTextWidget extends TkBaseWidget implements TextWidget {
	public readonly type = 'text'

	private text: any

	public constructor(options: TkWidgetOptions & TextWidgetOptions) {
		super(options)

		const { parent, enableScroll = false, ...rest } = options

		const frame = termKitUtil.buildFrame(options, parent)

		this.text = new termKit.TextBox({
			parent: parent ? parent.getTermKitElement() : undefined,
			scrollable: enableScroll,
			vScrollBar: enableScroll,
			hScrollBar: enableScroll && !rest.wordWrap,
			...rest,
			...frame,
		})

		this.calculateSizeLockDeltas()
	}

	public getTermKitElement() {
		return this.text
	}

	public setFrame(frame: WidgetFrame) {
		const oldFrame = this.getFrame()
		const newFrame = widgetUtil.buildFrame(frame, this.parent)

		this.text.setSizeAndPosition({
			x: newFrame.left ?? oldFrame.left,
			y: newFrame.top ?? oldFrame.top,
			width: newFrame.width ?? oldFrame.width,
			height: newFrame.height ?? oldFrame.height,
		})
		this.text.draw()
	}

	public getContent(): string {
		return this.text.content
	}

	private isLogScrolledAllTheWay() {
		const scrollDistance = this.text.scrollY * -1
		const contentHeight = this.text.textBuffer.cy
		const visibleHeight = this.text.textAreaHeight
		const maxScrollDistance =
			Math.max(contentHeight, visibleHeight) - visibleHeight
		const isScrolledAllTheWay = scrollDistance >= maxScrollDistance

		return isScrolledAllTheWay
	}

	public setContent(content: string): void {
		if (this.getContent() === content) {
			return
		}

		const isScrolledAllTheWay = this.isLogScrolledAllTheWay()
		const logSelection = this.text.textBuffer.selectionRegion

		const markupType = this.markupType(content)
		this.text.setContent(content, markupType)

		if (logSelection) {
			this.text.textBuffer.setSelectionRegion(logSelection)
		}

		if (isScrolledAllTheWay) {
			this.text.scrollToBottom()
		}
	}

	private markupType(content: string) {
		// eslint-disable-next-line no-control-regex
		const match = /\x1b\[([0-9;]+)m|(.[^\x1b]+)/g.exec(content)
		const markupType = match && match[1] ? 'ansi' : true
		return markupType
	}
}
