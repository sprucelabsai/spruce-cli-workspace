export interface WidgetButton {
	label: string
	onClick?: (cb: () => void) => void
}

export interface BaseWidget {
	type: string
	label?: string
	footerButtons?: WidgetButton[]
	getFrame(): WidgetFrame
}

export interface UniversalWidgetOptions {
	label?: string
	footerButtons?: WidgetButton[]
	width: WidgetFrameAttribute
	height: WidgetFrameAttribute
	left?: WidgetFrameAttribute
	top?: WidgetFrameAttribute
	useAutoLayout?: boolean
}

export interface TableWidgetOptions {}
export interface TableWidget extends BaseWidget {
	type: 'table'
}

export interface LogWidgetOptions {}
export interface LogWidget extends BaseWidget {
	type: 'log'
	writeLine: (str: string) => void
}

export interface BoxWidgetOptions {}
export interface BoxWidget extends BaseWidget {
	type: 'box'
}

export interface WidgetFrame {
	left: WidgetFrameAttribute
	top: WidgetFrameAttribute
	width: WidgetFrameAttribute
	height: WidgetFrameAttribute
}

export type WidgetFrameAttribute = number | string

export type Widget = TableWidget | LogWidget | BoxWidget

interface OptionsMap {
	table: TableWidgetOptions
	log: LogWidgetOptions
	box: BoxWidgetOptions
}

export type FactoryOptions<T extends Widget['type']> = UniversalWidgetOptions &
	OptionsMap[T]
