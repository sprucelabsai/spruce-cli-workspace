import { BaseWidget, WidgetFrame } from './widgets.types'

const widgetUtils = {
	buildFrame(frame?: Partial<WidgetFrame>, parent?: BaseWidget | null) {
		let { left = 0, top = 0, height = 0, width = 0 } = frame || {}

		if (typeof width === 'string') {
			if (!parent) {
				throw new Error(
					'I can only calculate percentage sizes if a parent is passed.'
				)
			}

			// -2 is for border width, add border support to basewidget when this causes problems
			width = parent.getFrame().width * (parseInt(width, 10) / 100) - 2
		}

		if (typeof height === 'string') {
			if (!parent) {
				throw new Error(
					'I can only calculate percentage sizes if a parent is passed.'
				)
			}

			// -2 is for border width, add border support to basewidget when this causes problems
			height = parent.getFrame().height * (parseInt(height, 10) / 100) - 2
		}

		return { left, top, height, width }
	},
}

export default widgetUtils
