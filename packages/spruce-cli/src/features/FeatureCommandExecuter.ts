import { features } from 'process'
import {
	ISchemaDefinition,
	SchemaDefinitionPartialValues,
	ISchema,
} from '@sprucelabs/schema'
import FormComponent from '../components/FormComponent'
import TerminalInterface from '../interfaces/TerminalInterface'
import FeatureInstaller from './FeatureInstaller'
import { FeatureCode, IFeatureMap } from './features.types'

type FeatureCommandExecuteOptions<
	F extends FeatureCode
> = IFeatureMap[F]['optionsDefinition'] extends ISchemaDefinition
	? SchemaDefinitionPartialValues<IFeatureMap[F]['optionsDefinition']>
	: undefined

export default class FeatureCommandExecuter<F extends FeatureCode> {
	private featureCode: F
	// @ts-ignore
	private actionCode: string
	private term: TerminalInterface
	private featureInstaller: FeatureInstaller

	public constructor(options: {
		term: TerminalInterface
		featureCode: F
		actionCode: string
		featureInstaller: FeatureInstaller
	}) {
		this.featureCode = options.featureCode
		this.actionCode = options.actionCode
		this.term = options.term
		this.featureInstaller = options.featureInstaller
	}

	public async execute(options?: FeatureCommandExecuteOptions<F>) {
		const feature = this.featureInstaller.getFeature(this.featureCode)
		const action = feature.Action(this.actionCode)

		if (feature.optionsDefinition) {
			const answers = await this.collectAnswers(
				feature.optionsDefinition,
				options
			)

			const isInstalled = await this.featureInstaller.isInstalled(
				this.featureCode
			)

			if (!isInstalled) {
				await this.featureInstaller.install({
					features: [
						{
							code: this.featureCode,
							//@ts-ignore
							options: { ...options, ...answers },
						},
					],
				})
			}
		}

		if (action.optionsDefinition) {
			const answers = await this.collectAnswers(
				action.optionsDefinition,
				options
			)

			await action.execute(answers)
		}
	}

	private async collectAnswers(
		definition: ISchemaDefinition,
		options: FeatureCommandExecuteOptions<F> | undefined
	) {
		const featureForm = new FormComponent({
			term: this.term,
			definition,
			initialValues: options,
		})

		const fieldNames = Object.keys(definition.fields ?? {})
		const providedFieldNames = options ? Object.keys(options ?? {}) : []
		const fieldsToPresent = fieldNames.filter(
			(name) => providedFieldNames.indexOf(name) === -1
		)
		const answers = await featureForm.present({
			showOverview: false,
			// @ts-ignore
			fields: fieldsToPresent,
		})
		return { ...(options ?? {}), ...answers }
	}
}
