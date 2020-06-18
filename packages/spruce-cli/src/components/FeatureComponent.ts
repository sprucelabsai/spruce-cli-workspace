import {
	SchemaDefinitionValues,
	ISchemaDefinition,
	SchemaDefinitionPartialValues,
	SchemaFieldNames
} from '@sprucelabs/schema'
import { Features } from '#spruce/autoloaders/features'
import AbstractFeature from '../features/AbstractFeature'
import TerminalUtility from '../utilities/TerminalUtility'
import AbstractComponent from './AbstractComponent'

export interface IFeatureComponentOptions {
	term: TerminalUtility
}

type PromptResponse<
	F extends AbstractFeature<any>
> = F['optionsDefinition'] extends ISchemaDefinition
	? SchemaDefinitionValues<F['optionsDefinition']>
	: undefined

interface IPromptOptions<F extends Features> {
	values?: F['optionsDefinition'] extends ISchemaDefinition
		? SchemaDefinitionPartialValues<F['optionsDefinition']>
		: never
}
export default class FeatureComponent extends AbstractComponent {
	public prompt = async <F extends Features>(
		feature: F,
		options: IPromptOptions<F> = {}
	): Promise<PromptResponse<F>> => {
		const definition = feature.optionsDefinition
		const { values } = options

		if (!definition) {
			return new Promise(resolve => resolve(undefined))
		}

		const form = this.formComponent({
			definition
		})

		// if they passed values, don't show those fields
		const fieldNames = Object.keys(definition.fields)
		const answeredFieldNames = Object.keys(values ?? [])

		for (let i = 0; i < answeredFieldNames.length; i++) {
			const idx = fieldNames.indexOf(answeredFieldNames[i])
			if (idx > -1) {
				delete fieldNames[idx]
			}
		}

		let answers = await form.present({
			fields: fieldNames as SchemaFieldNames<typeof definition>
		})

		if (values) {
			answers = {
				...answers,
				...values
			}
		}

		return answers as PromptResponse<F>
	}
}
