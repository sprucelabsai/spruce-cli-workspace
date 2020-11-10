import widgetUtil from '../widget.utilities'
import { BaseWidget, WidgetFrame } from '../widgets.types'

const termKitUtil = {
	buildFrame(frame: Partial<WidgetFrame>, parent?: BaseWidget | null) {
		const calculated = widgetUtil.buildFrame(frame, parent)
		return {
			x: calculated.left,
			y: calculated.top,
			width: calculated.width,
			height: calculated.height,
		}
	},
}

export default termKitUtil
