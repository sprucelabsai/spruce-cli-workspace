import BlessedAbstractWidget from './BlessedAbstractWidget'
import { TableWidget } from './widgets.types'

export default class BlessedTableWidget
	extends BlessedAbstractWidget
	implements TableWidget {
	public readonly type: 'table' = 'table'
}
