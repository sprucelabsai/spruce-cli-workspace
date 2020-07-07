import { ISchemaDefinition } from '@sprucelabs/schema'
import TerminalInterface from '../interfaces/TerminalInterface'
import FormComponent, { IFormOptions } from './FormComponent'

export default abstract class AbstractComponent {
	protected term: TerminalInterface
	public constructor(term: TerminalInterface) {
		this.term = term
	}

	public formComponent<T extends ISchemaDefinition>(
		options: Omit<IFormOptions<T>, 'term'>
	): FormComponent<T> {
		const formBuilder = new FormComponent({
			term: this.term,
			...options
		})
		return formBuilder
	}
}
