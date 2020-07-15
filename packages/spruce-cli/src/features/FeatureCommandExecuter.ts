import {
	ISchemaDefinition,
	SchemaDefinitionPartialValues,
	SchemaDefinitionValues,
} from '@sprucelabs/schema'
import FormComponent from '../components/FormComponent'
import { IGraphicsInterface } from '../types/cli.types'
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
	private term: IGraphicsInterface
	private featureInstaller: FeatureInstaller

	public constructor(options: {
		term: IGraphicsInterface
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
		this.term.startLoading(`Loading ${this.featureCode}...`)

		const feature = this.featureInstaller.getFeature(this.featureCode)
		const action = feature.Action(this.actionCode)

		if (feature.optionsDefinition) {
			this.term.stopLoading()

			const answers = await this.collectAnswers(
				feature.optionsDefinition,
				options
			)

			const isInstalled = await this.featureInstaller.isInstalled(
				this.featureCode
			)

			if (!isInstalled) {
				this.term.startLoading(`Installing ${this.featureCode}...`)

				await this.featureInstaller.install({
					features: [
						// @ts-ignore
						{
							code: this.featureCode,
							//@ts-ignore
							options: { ...options, ...answers },
						},
					],
				})
			}
		}

		const definition = action.optionsDefinition
		let answers

		if (definition) {
			answers = await this.collectAnswers(definition, options)
		}

		this.term.startLoading(
			`Executing ${this.featureCode}.${this.actionCode}...`
		)

		// @ts-ignore
		const results = await action.execute(answers)

		this.term.stopLoading()

		this.term.presentExecutionSummary({
			featureCode: this.featureCode,
			actionCode: this.actionCode,
			...results,
		})
	}

	private async collectAnswers<S extends ISchemaDefinition>(
		definition: S,
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
		let answers = {}
		if (fieldsToPresent.length > 0) {
			answers = await featureForm.present({
				showOverview: false,
				// @ts-ignore
				fields: fieldsToPresent,
			})
		}
		return { ...(options ?? {}), ...answers } as SchemaDefinitionValues<S>
	}
}
