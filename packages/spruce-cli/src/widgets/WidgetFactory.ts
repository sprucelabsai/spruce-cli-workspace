import { Writable, Readable } from 'stream'
import blessed from 'blessed'
import contrib from 'blessed-contrib'
import SpruceError from '../errors/SpruceError'
import BlessedBoxWidget from './BlessedBoxWidget'
import BlessedLogWidget from './BlessedLogWidget'
import BlessedTableWidget from './BlessedTableWidget'
import { Widget, FactoryOptions } from './widgets.types'

export const widgetRegistry = {
	log: BlessedLogWidget,
	table: BlessedTableWidget,
	box: BlessedBoxWidget,
}

export type WidgetRegistry = typeof widgetRegistry

interface WidgetFactoryOptions {
	debug?: boolean
	input?: Writable
	output?: Readable
}

export default class WidgetFactory {
	private grid: contrib.grid
	private left = 0
	private top = 0
	private paddingTop = 0

	public constructor(options?: WidgetFactoryOptions) {
		const screen = blessed.screen(options)

		this.grid = new contrib.grid({
			rows: 12,
			cols: 12,
			screen,
			hideBorder: true,
		})
	}

	public Widget<T extends Widget['type']>(
		type: T,
		options: FactoryOptions<T>
	): InstanceType<WidgetRegistry[T]> {
		const Class = widgetRegistry[type]

		this.assertGoodSizing<T>(options)

		let left = typeof options.left !== 'undefined' ? options.left : this.left
		let top =
			typeof options.top !== 'undefined'
				? options.top
				: this.top + this.paddingTop

		if (
			options.useAutoLayout === false &&
			typeof options.left === 'number' &&
			typeof options.top === 'number'
		) {
			left = options.left || 0
			top = options.top || 0
		}

		const instance = new Class({
			grid: this.grid,
			top,
			left,
			...options,
		})

		if (
			options.useAutoLayout !== false &&
			typeof options.height === 'number' &&
			typeof options.width === 'number'
		) {
			// this.top += options.height
			this.left += options.width
		}

		return instance as InstanceType<WidgetRegistry[T]>
	}

	private assertGoodSizing<T extends Widget['type']>(
		options: FactoryOptions<T>
	) {
		const invalidParams = []
		let errorMessage = ''

		if (!options.useAutoLayout) {
			if (typeof options.width === 'string') {
				invalidParams.push('width')
				errorMessage = `You can't use percentage sizes unless you set useAutoLayout=false`
			}

			if (typeof options.height === 'string') {
				invalidParams.push('height')
				errorMessage = `You can't use percentage sizes unless you set useAutoLayout=false`
			}
		}

		if (invalidParams.length > 0) {
			throw new SpruceError({
				code: 'INVALID_PARAMETERS',
				parameters: invalidParams,
				friendlyMessage: errorMessage,
			})
		}
	}

	public setPaddingTop(padding: number) {
		this.paddingTop = padding
	}
}
