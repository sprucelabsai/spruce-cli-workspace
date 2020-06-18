import { ISchemaDefinition } from '@sprucelabs/schema'
import TerminalUtility from '../utilities/TerminalUtility'
import { IFeatureComponentOptions } from './FeatureComponent'
import FormComponent, { IFormOptions } from './FormComponent'

export default abstract class AbstractComponent {
	protected term: TerminalUtility
	public constructor(options: IFeatureComponentOptions) {
		this.term = options.term
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
