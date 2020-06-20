import { ISchemaDefinition } from '@sprucelabs/schema'
import TerminalService from '../services/TerminalService'
import FormComponent, { IFormOptions } from './FormComponent'

export default abstract class AbstractComponent {
	protected term: TerminalService
	public constructor(term: TerminalService) {
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
