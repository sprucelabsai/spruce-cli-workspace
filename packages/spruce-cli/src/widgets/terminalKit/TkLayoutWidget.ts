import { isObject } from 'lodash'
import terminal_kit from 'terminal-kit'
import SpruceError from '../../errors/SpruceError'
import { LayoutWidget, LayoutWidgetOptions } from '../widgets.types'
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

		const mappedOptions = this.mapWidgetOptionsToTermKitOptions(options)
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

	public destroy() {
		this.layout.destroy()
	}

	public setFrame() {
		this.layout.computeBoundingBoxes()
		this.layout.draw()

		this.sizeLockedChildren()
	}

	private mapWidgetOptionsToTermKitOptions(options: Record<string, any>) {
		const mapped: Record<string, any> = {}
		const keys = Object.keys(options)

		for (const key of keys) {
			const item = options[key]
			if (Array.isArray(item)) {
				mapped[key] = []
				for (const i of item) {
					mapped[key].push(this.mapWidgetOptionsToTermKitOptions(i))
				}
			} else {
				switch (key) {
					case 'left':
						mapped.x = item
						break
					case 'top':
						mapped.y = item
						break
					case 'width':
						if (typeof item === 'string') {
							mapped.widthPercent = parseInt(item)
						}
						break
					case 'height':
						if (typeof item === 'string') {
							mapped.heightPercent = parseInt(item)
						}
						break
					case 'parent':
						mapped.parent = item.getTermKitElement()
						break
					default:
						if (typeof item !== 'function' && isObject(item)) {
							mapped[key] = this.mapWidgetOptionsToTermKitOptions(item)
						} else {
							mapped[key] = item
						}
				}
			}
		}
		return mapped
	}
}
