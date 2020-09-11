import BlessedAbstractWidget from './BlessedAbstractWidget'
import { LogWidget } from './widgets.types'

export default class BlessedLogWidget
	extends BlessedAbstractWidget
	implements LogWidget {
	public readonly type: 'log' = 'log'

	public writeLine() {}
}
