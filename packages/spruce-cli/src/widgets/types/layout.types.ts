import { WidgetFrameAttribute, BaseWidget } from './widgets.types'

// ** Layout Widget ** //

export interface LayoutWidgetOptions {
	rows: LayoutRow[]
}

export type LayoutRow = {
	id?: string
	columns: LayoutColumn[]
	height?: WidgetFrameAttribute
}

export type LayoutColumn = {
	id: string
	width?: WidgetFrameAttribute
}

export interface LayoutWidget extends BaseWidget {
	readonly type: 'layout'
	getRows(): any[]
	addRow(row: LayoutRow): void
	removeRow(rowIdx: number): void
	setRowHeight(rowIdx: number, height: WidgetFrameAttribute): void
	updateLayout(): void
}

export interface LayoutCellWidgetOptions {}

export interface LayoutCellWidget extends BaseWidget {
	readonly type: 'layoutCell'
}
