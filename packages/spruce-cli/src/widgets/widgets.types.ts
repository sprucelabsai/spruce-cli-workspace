import { EventContract, MercuryEventEmitter } from '@sprucelabs/mercury-types'
import { buildSchema } from '@sprucelabs/schema'
import keySelectChoices from './keySelectChoices'

export interface WidgetButton {
	label: string
	onClick?: (cb: () => void) => void
}

export interface BaseWidget<Contract extends EventContract = EventContract>
	extends MercuryEventEmitter<Contract> {
	type: string
	getId(): string | null
	getFrame(): WidgetFrameCalculated
	setFrame(frame: Partial<WidgetFrame>): void
	getParent(): BaseWidget | null
	destroy(): Promise<void>
	getChildById(id?: string): BaseWidget | null
	getChildren(): BaseWidget[]
	addChild(child: BaseWidget): void
}

export interface UniversalWidgetOptions {
	id?: string
	width?: WidgetFrameAttribute
	height?: WidgetFrameAttribute
	left?: WidgetFrameAttribute
	top?: WidgetFrameAttribute
	parent?: BaseWidget
	shouldLockWidthWithParent?: boolean
	shouldLockHeightWithParent?: boolean
	eventContract?: EventContract
}

export interface WidgetFrame {
	left: WidgetFrameAttribute
	top: WidgetFrameAttribute
	width: WidgetFrameAttribute
	height: WidgetFrameAttribute
}

export interface WidgetFrameCalculated {
	left: number
	top: number
	width: number
	height: number
}

export type WidgetFrameAttribute = number | string

// ** Table Widget **//

export interface TableWidgetOptions {}
export interface TableWidget extends BaseWidget {
	type: 'table'
}

// **** //

// ** Window Widget ** //
export const windowEventContract = {
	eventSignatures: [
		{
			eventNameWithOptionalNamespace: 'key',
			emitPayloadSchema: buildSchema({
				id: 'windowKeyEmitPayload',
				fields: {
					key: {
						type: 'select',
						isRequired: true,
						options: {
							choices: keySelectChoices,
						},
					},
				},
			}),
		},
	],
} as const

export type WindowEventContract = typeof windowEventContract

export interface WindowWidgetOptions {}

export interface WindowWidget extends BaseWidget<WindowEventContract> {
	readonly type: 'window'
	hideCursor: () => void
	showCursor: () => void
	setTitle: (title: string) => void
}
// **** //

// ** Text Widget ** //
export interface TextWidgetOptions {
	enableScroll?: boolean
	wordWrap?: boolean
}

export interface TextWidget extends BaseWidget {
	readonly type: 'text'
}
// **** //

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
}
// **** //

// ** Layout Cell ** //
export interface LayoutCellWidgetOptions {}

export interface LayoutCellWidget extends BaseWidget {}
// **** //

// ** Progress Bar **//
export interface ProgressBarWidgetOptions {
	label?: string
	progress: number
}

export interface ProgressBarWidget extends BaseWidget {
	readonly type: 'progressBar'

	setLabel(label?: string): void
	setProgress(progress: number): void
}
// **** //

// ** Menu Bar **/
export const menuBarEventContract = {
	eventSignatures: [
		{
			eventNameWithOptionalNamespace: 'select',
			emitPayloadSchema: buildSchema({
				id: 'menuBarSelectEmitPayload',
				fields: {
					value: {
						type: 'text',
						isRequired: true,
					},
				},
			}),
		},
	],
} as const

export type MenuBarEventContract = typeof menuBarEventContract

export interface MenuBarWidgetOptions {
	items: MenuBarWidgetItem[]
}

export interface MenuBarWidgetItem {
	label: string
	value: string
	items?: MenuBarWidgetItem[]
}

export interface MenuBarWidget extends BaseWidget<MenuBarEventContract> {
	readonly type: 'menuBar'
}
// **** //

interface OptionsMap {
	text: TextWidgetOptions
	window: WindowWidgetOptions
	layout: LayoutWidgetOptions
	layoutCell: LayoutCellWidgetOptions
	progressBar: ProgressBarWidgetOptions
	menuBar: MenuBarWidgetOptions
}

export interface WidgetRegistry {
	text: TextWidget
	window: WindowWidget
	layout: LayoutWidget
	layoutCell: LayoutCellWidget
	progressBar: ProgressBarWidget
	menuBar: MenuBarWidget
}

export type WidgetType = keyof WidgetRegistry

export type Widget<T extends WidgetType = WidgetType> = WidgetRegistry[T]

export type FactoryOptions<T extends WidgetType> = UniversalWidgetOptions &
	OptionsMap[T]
