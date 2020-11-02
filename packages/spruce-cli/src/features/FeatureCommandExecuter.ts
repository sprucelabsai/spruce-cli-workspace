import { ISchema, SchemaPartialValues, SchemaValues } from '@sprucelabs/schema'
import merge from 'lodash/merge'
import FormComponent from '../components/FormComponent'
import SpruceError from '../errors/SpruceError'
import { GraphicsInterface } from '../types/cli.types'
import formUtil from '../utilities/form.utility'
import AbstractFeature from './AbstractFeature'
import FeatureInstaller from './FeatureInstaller'
import {
	FeatureCode,
	FeatureInstallResponse,
	IFeatureAction,
	IFeatureMap,
} from './features.types'

type FeatureCommandExecuteOptions<
	F extends FeatureCode
> = IFeatureMap[F]['optionsDefinition'] extends ISchema
	? SchemaPartialValues<IFeatureMap[F]['optionsDefinition']>
	: undefined | Record<string, any>

export default class FeatureCommandExecuter<F extends FeatureCode> {
	private featureCode: F
	private actionCode: string
	private ui: GraphicsInterface
	private featureInstaller: FeatureInstaller

	public constructor(options: {
		term: GraphicsInterface
		featureCode: F
		actionCode: string
		featureInstaller: FeatureInstaller
	}) {
		this.featureCode = options.featureCode
		this.actionCode = options.actionCode
		this.ui = options.term
		this.featureInstaller = options.featureInstaller
	}

	public async execute(
		options?: Record<string, any> & FeatureCommandExecuteOptions<F>
	) {
		let results = await this.installMissingDependencies()

		const feature = this.featureInstaller.getFeature(this.featureCode)
		const action = feature.Action(this.actionCode)

		const isInstalled = await this.featureInstaller.isInstalled(
			this.featureCode
		)

		const installOptions = await this.askAboutMissingFeatureOptionsIfFeatureIsNotInstalled(
			isInstalled,
			feature,
			options
		)

		let answers = await this.askAboutMissingActionOptions(action, options)

		if (!isInstalled) {
			const ourFeatureResults = await this.installOurFeature(installOptions)
			results = merge(results, ourFeatureResults)
		}

		const executeResults = await action.execute(answers || {})
		results = merge(results, executeResults)

		this.ui.stopLoading()

		this.ui.clear()
		this.ui.renderCommandSummary({
			featureCode: this.featureCode,
			actionCode: this.actionCode,
			headline: action.name,
			...results,
		})

		return results
	}

	private async askAboutMissingActionOptions(
		action: IFeatureAction<ISchema>,
		options: (Record<string, any> & FeatureCommandExecuteOptions<F>) | undefined
	) {
		let answers

		const schema = action.optionsSchema
		if (schema) {
			answers = await this.collectAnswers(schema, options)
		}
		return answers
	}

	private async installOurFeature(installOptions: Record<string, any>) {
		this.ui.clear()
		this.ui.startLoading(`Installing ${this.featureCode}...`)

		const installResults = await this.featureInstaller.install({
			features: [
				{
					code: this.featureCode,
					//@ts-ignore
					options: installOptions,
				},
			],
		})

		this.ui.stopLoading()

		return installResults
	}

	private async askAboutMissingFeatureOptionsIfFeatureIsNotInstalled(
		isInstalled: boolean,
		feature: IFeatureMap[F],
		options: (Record<string, any> & FeatureCommandExecuteOptions<F>) | undefined
	) {
		let installOptions = { ...options }
		if (!isInstalled) {
			if (feature.optionsDefinition) {
				const answers = await this.collectAnswers(
					feature.optionsDefinition,
					options
				)

				installOptions = { ...installOptions, ...answers }
			}
		}
		return installOptions
	}

	private getCommandName() {
		return `${this.featureCode}.${this.actionCode}`
	}

	private async installMissingDependencies(): Promise<FeatureInstallResponse> {
		const notInstalled = await this.getDependenciesNotInstalled()

		let results: FeatureInstallResponse = {}

		if (notInstalled.length > 0) {
			this.ui.renderLine(
				`Before you can run ${this.getCommandName()} I'll need to install ${
					notInstalled.length
				} feature${
					notInstalled.length === 1 ? '' : 's'
				}. Don't worry, I'll walk you through it!`
			)

			while (notInstalled.length > 0) {
				const toInstall = notInstalled.shift()
				if (!toInstall) {
					// for typescript
					throw new Error('Dependent feature error')
				}
				const installResults = await this.installMissingDependency(toInstall)
				results = merge(results, installResults)
			}

			this.ui.clear()
			await this.ui.waitForEnter(
				`Phew, now that that's done, lets get back to ${this.getCommandName()}!`
			)
		}

		return results
	}

	private async installMissingDependency(
		toInstall: AbstractFeature<ISchema | undefined>
	): Promise<FeatureInstallResponse> {
		const confirm = await this.ui.confirm(
			`Install the ${toInstall?.nameReadable} feature?`
		)

		if (!confirm) {
			throw new SpruceError({
				code: 'COMMAND_ABORTED',
				command: this.getCommandName(),
			})
		}

		let installOptions = {}

		if (toInstall.optionsDefinition) {
			installOptions = await this.collectAnswers(
				toInstall.optionsDefinition,
				undefined
			)
		}

		this.ui.clear()
		this.ui.startLoading(`Installing ${toInstall.nameReadable}...`)

		const installResults = await this.featureInstaller.install({
			features: [
				{
					code: toInstall.code,
					//@ts-ignore
					options: installOptions,
				},
			],
		})

		this.ui.stopLoading()

		return installResults
	}

	private async getDependenciesNotInstalled() {
		const dependencies = this.featureInstaller.getFeatureDependencies(
			this.featureCode
		)

		const installedStatuses = await Promise.all(
			dependencies.map(async (code) => {
				const feature = this.featureInstaller.getFeature(code)
				const isInstalled = await feature.isInstalled()

				return !isInstalled ? feature : null
			})
		)

		const notInstalled = installedStatuses.filter(
			(feature) => !!feature
		) as AbstractFeature[]

		return notInstalled
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
				term: this.ui,
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
