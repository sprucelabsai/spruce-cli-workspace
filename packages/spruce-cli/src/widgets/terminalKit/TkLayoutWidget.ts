import terminal_kit from 'terminal-kit'
import SpruceError from '../../errors/SpruceError'
import {
	LayoutColumn,
	LayoutRow,
	LayoutWidget,
	LayoutWidgetOptions,
} from '../types/layout.types'
import { WidgetFrameAttribute } from '../types/widgets.types'
import termKitUtil from './termKit.utility'
import TkBaseWidget, { TkWidgetOptions } from './TkBaseWidget'
import TkLayoutCellWidget from './TkLayoutCellWidget'
const termKit = terminal_kit as any

export default class TkLayoutWidget
	extends TkBaseWidget
	implements LayoutWidget {
	public readonly type = 'layout'

	private layout: any

	public constructor(options: TkWidgetOptions & LayoutWidgetOptions) {
		super(options)

		const mappedOptions = termKitUtil.mapWidgetOptionsToTermKitOptions(options)

		const {
			parent,
			lockWidthWithParent = true,
			lockHeightWithParent = true,
			...layout
		} = mappedOptions

		if (!parent) {
			throw new SpruceError({
				code: 'MISSING_PARAMETERS',
				parameters: ['parent'],
			})
		}

		if (!lockWidthWithParent || !lockHeightWithParent) {
			throw new SpruceError({
				code: 'INVALID_PARAMETERS',
				parameters: ['lockWidthWithParent', 'lockHeightWithParent'],
				friendlyMessage: `A layout widget must have lockWidthWithParent & lockHeightWithParent true (don't set to false since default is true)`,
			})
		}

		this.layout = new termKit.Layout({
			parent,
			layout,
		})

		this.layout.__widget = this
		this.layout.off('parentResize', this.layout.onParentResize)
	}

	public getChildren() {
		return this.layout.zChildren.map((child: any) => {
			return new TkLayoutCellWidget({
				term: this.term,
				termKitElement: child,
				parent: this,
			})
		})
	}

	public getTermKitElement() {
		return this.layout
	}

	public getFrame() {
		return {
			left: 0,
			top: 0,
			width: this.layout.outputDst.width,
			height: this.layout.outputDst.height,
		}
	}

	public async destroy() {
		this.layout.destroy()
	}

	public setFrame() {
		this.layout.computeBoundingBoxes()
		this.layout.draw()

		this.sizeLockedChildren()
	}

	public getRows(): LayoutRow[] {
		const rows = this.layout.layoutDef.rows
		const layoutRows = this.termKitRowsToLayoutRows(rows)

		return layoutRows
	}

	private termKitRowsToLayoutRows(rows: any): LayoutRow[] {
		return rows.map((row: any) => ({
			...termKitUtil.mapTermKitOptionsToWidgetOptions(row),
			columns: this.termKitColumnsToLayoutColumns(row.columns),
		}))
	}

	private termKitColumnsToLayoutColumns(columns: any) {
		return columns.map((col: any) =>
			termKitUtil.mapTermKitOptionsToWidgetOptions(col)
		)
	}

	public addRow(row: LayoutRow): void {
		this.layout.layoutDef.rows.push({
			...termKitUtil.mapWidgetOptionsToTermKitOptions(row),
			columns: this.widgetColumnsToTermKitColumns(row.columns),
		})
	}

	public removeRow(rowIdx: number): void {
		this.layout.layoutDef.rows.splice(rowIdx, 1)
	}

	private widgetColumnsToTermKitColumns(columns: LayoutColumn[]) {
		return columns.map((column) => ({
			...termKitUtil.mapWidgetOptionsToTermKitOptions(column),
		}))
	}

	public setRowHeight(rowIdx: number, height: WidgetFrameAttribute): void {
		this.layout.layoutDef.rows[rowIdx] = {
			...this.layout.layoutDef.rows[rowIdx],
			...termKitUtil.mapWidgetOptionsToTermKitOptions({ height }),
		}
	}

	public updateLayout() {
		this.setFrame()
	}
}
