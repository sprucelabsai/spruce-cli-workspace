import { WidgetFrame } from './widgets.types'

const widgetUtils = {
	buildFrame(frame?: Partial<WidgetFrame>) {
		const { left = 0, top = 0, height = 0, width = 0 } = frame || {}
		return { left, top, height, width }
	},
}

export default widgetUtils
