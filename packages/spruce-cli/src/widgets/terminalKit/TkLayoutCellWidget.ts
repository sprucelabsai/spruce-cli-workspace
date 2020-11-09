import { LayoutCellWidget, LayoutCellWidgetOptions } from '../widgets.types'
import TkBaseWidget, { TkWidgetOptions } from './TkBaseWidget'

export default class TkLayoutCellWidget
	extends TkBaseWidget
	implements LayoutCellWidget {
	private cell: any

	public constructor(
		options: TkWidgetOptions & LayoutCellWidgetOptions & { termKitElement: any }
	) {
		super({
			shouldLockHeightWithParent: true,
			shouldLockWidthWithParent: true,
			...options,
		})
		this.cell = options.termKitElement
	}

	public getId() {
		return this.cell.id
	}

	public getTermKitElement() {
		return this.cell
	}

	public getFrame() {
		return {
			left: this.cell.outputDst.x,
			top: this.cell.outputDst.y,
			width: this.cell.outputDst.width,
			height: this.cell.outputDst.height,
		}
	}

	public setFrame() {
		this.sizeLockedChildren()
	}
}
