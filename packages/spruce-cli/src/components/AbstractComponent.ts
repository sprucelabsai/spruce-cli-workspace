import { Schema } from '@sprucelabs/schema'
import TerminalInterface from '../interfaces/TerminalInterface'
import FormComponent, { FormOptions } from './FormComponent'

export default abstract class AbstractComponent {
	protected term: TerminalInterface
	public constructor(term: TerminalInterface) {
		this.term = term
	}

	public formComponent<T extends Schema>(
		options: Omit<FormOptions<T>, 'term'>
	): FormComponent<T> {
		const formBuilder = new FormComponent({
			term: this.term,
			...options,
		})
		return formBuilder
	}
}
