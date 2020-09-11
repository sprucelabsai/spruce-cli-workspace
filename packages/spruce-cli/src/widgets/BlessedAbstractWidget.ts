import contrib from 'blessed-contrib'
import widgetUtils from './widget.utilities'
import {
	BaseWidget,
	UniversalWidgetOptions,
	WidgetButton,
	WidgetFrame,
	WidgetFrameAttribute,
} from './widgets.types'

export interface BlessedOptions {
	left: WidgetFrameAttribute
	top: WidgetFrameAttribute
	grid: contrib.grid
}

export default abstract class BlessedAbstractWidget implements BaseWidget {
	public readonly label?: string | undefined
	public abstract readonly type: string
	public readonly footerButtons?: WidgetButton[]

	private frame: WidgetFrame = widgetUtils.buildFrame()

	public constructor(options: UniversalWidgetOptions & BlessedOptions) {
		this.label = options.label
		this.footerButtons = options.footerButtons
		this.frame = widgetUtils.buildFrame(options)
	}

	public getFrame(): WidgetFrame {
		return this.frame
	}
}
