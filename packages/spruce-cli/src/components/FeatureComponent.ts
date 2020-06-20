import {
	SchemaDefinitionValues,
	ISchemaDefinition,
	SchemaDefinitionPartialValues,
	SchemaFieldNames
} from '@sprucelabs/schema'
import FeatureManager, { Feature, IFeatureMap } from '../FeatureManager'
import AbstractFeature from '../features/AbstractFeature'
import TerminalService from '../services/TerminalService'
import AbstractComponent from './AbstractComponent'

type PromptResponse<
	F extends AbstractFeature
> = F['optionsDefinition'] extends ISchemaDefinition
	? SchemaDefinitionValues<F['optionsDefinition']>
	: undefined

interface IPromptOptions<F extends AbstractFeature> {
	values?: F['optionsDefinition'] extends ISchemaDefinition
		? SchemaDefinitionPartialValues<F['optionsDefinition']>
		: never
}
export default class FeatureComponent extends AbstractComponent {
	protected featureManager: FeatureManager

	public constructor(term: TerminalService, featureManager: FeatureManager) {
		super(term)
		this.featureManager = featureManager
	}

	public prompt = async <F extends Feature>(
		featureCode: F,
		options: IPromptOptions<IFeatureMap[F]> = {}
	): Promise<PromptResponse<IFeatureMap[F]>> => {
		const feature = this.featureManager.getFeature(featureCode)
		const definition = feature.optionsDefinition
		const { values } = options

		if (!definition || !definition.fields) {
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

		return answers as PromptResponse<IFeatureMap[F]>
	}
}
