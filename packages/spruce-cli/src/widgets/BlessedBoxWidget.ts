import BlessedAbstractWidget from './BlessedAbstractWidget'
import { BoxWidget } from './widgets.types'

export default class BlessedBoxWidget
	extends BlessedAbstractWidget
	implements BoxWidget {
	public readonly type: 'box' = 'box'
}
