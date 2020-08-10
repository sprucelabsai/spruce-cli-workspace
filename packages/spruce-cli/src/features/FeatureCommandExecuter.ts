import { ISchema, SchemaPartialValues, SchemaValues } from '@sprucelabs/schema'
import FormComponent from '../components/FormComponent'
import { IGraphicsInterface } from '../types/cli.types'
import formUtil from '../utilities/form.utility'
import FeatureInstaller from './FeatureInstaller'
import { FeatureCode, IFeatureMap } from './features.types'

type FeatureCommandExecuteOptions<
	F extends FeatureCode
> = IFeatureMap[F]['optionsDefinition'] extends ISchema
	? SchemaPartialValues<IFeatureMap[F]['optionsDefinition']>
	: undefined | Record<string, any>

export default class FeatureCommandExecuter<F extends FeatureCode> {
	private featureCode: F
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

	public async execute(
		options?: Record<string, any> & FeatureCommandExecuteOptions<F>
	) {
		const feature = this.featureInstaller.getFeature(this.featureCode)
		const action = feature.Action(this.actionCode)

		this.term.stopLoading()

		const isInstalled = await this.featureInstaller.isInstalled(
			this.featureCode
		)

		if (!isInstalled) {
			let installOptions = { ...options }

			if (feature.optionsDefinition) {
				const answers = await this.collectAnswers(
					feature.optionsDefinition,
					options
				)

				installOptions = { ...installOptions, ...answers }
			}

			this.term.startLoading(`Installing ${this.featureCode}...`)

			await this.featureInstaller.install({
				features: [
					{
						code: this.featureCode,
						//@ts-ignore
						options: installOptions,
					},
				],
			})

			this.term.stopLoading()
		}

		const definition = action.optionsSchema
		let answers

		if (definition) {
			answers = await this.collectAnswers(definition, options)
		}

		// @ts-ignore
		const results = await action.execute(answers)

		this.term.stopLoading()

		this.term.renderCommandSummary({
			featureCode: this.featureCode,
			actionCode: this.actionCode,
			...results,
		})
	}

	private async collectAnswers<S extends ISchema>(
		schema: S,
		options: FeatureCommandExecuteOptions<F> | undefined
	) {
		const fieldNames = Object.keys(schema.fields ?? {})
		const providedFieldNames = options ? Object.keys(options ?? {}) : []
		const fieldsToPresent = fieldNames.filter(
			(name) =>
				providedFieldNames.indexOf(name) === -1 &&
				schema.fields?.[name].isRequired === true &&
				schema.fields?.[name].isPrivate !== true
		)
		let answers = {}
		if (fieldsToPresent.length > 0) {
			const featureForm = new FormComponent({
				term: this.term,
				schema,
				initialValues: options,
				onWillAskQuestion: formUtil.onWillAskQuestionHandler.bind(
					formUtil
				) as any,
			})

			answers = await featureForm.present({
				showOverview: false,
				// @ts-ignore
				fields: fieldsToPresent,
			})
		}

		return { ...(options ?? {}), ...answers } as SchemaValues<S>
	}
}
