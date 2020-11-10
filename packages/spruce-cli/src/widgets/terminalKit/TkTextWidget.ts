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
}
