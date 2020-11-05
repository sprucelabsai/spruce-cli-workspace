import { ISchema, SchemaPartialValues, SchemaValues } from '@sprucelabs/schema'
import { option } from 'commander'
import merge from 'lodash/merge'
import FormComponent from '../components/FormComponent'
import SpruceError from '../errors/SpruceError'
import { GraphicsInterface } from '../types/cli.types'
import formUtil from '../utilities/form.utility'
import AbstractFeature, { FeatureDependency } from './AbstractFeature'
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

type FeatureDependencyWithFeature = FeatureDependency & {
	feature: AbstractFeature
}

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
	): Promise<FeatureInstallResponse> {
		let response = await this.installMissingDependencies()

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
			response = merge(response, ourFeatureResults)
		}

		const executeResults = await action.execute(answers || {})
		response = merge(response, executeResults)

		this.ui.stopLoading()

		this.ui.clear()
		this.ui.renderCommandSummary({
			featureCode: this.featureCode,
			actionCode: this.actionCode,
			headline: action.name,
			...response,
		})

		return response
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
			installFeatureDependencies: false,
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

		let response: FeatureInstallResponse = {}

		if (notInstalled.length > 0) {
			this.ui.renderLine(this.generateConfirmInstallMessage(notInstalled))

			while (notInstalled.length > 0) {
				const toInstall = notInstalled.shift()
				if (!toInstall) {
					// for typescript
					throw new Error('Dependent feature error')
				}
				const installResults = await this.installMissingDependency(toInstall)
				response = merge(response, installResults)
			}

			this.ui.clear()

			await this.ui.waitForEnter(
				`Phew, now that we're done with that, lets get back to ${this.getCommandName()}!`
			)
		}

		return response
	}

	private generateConfirmInstallMessage(
		notInstalled: FeatureDependencyWithFeature[]
	): string {
		const required: FeatureDependencyWithFeature[] = []
		const optional: FeatureDependencyWithFeature[] = []

		notInstalled.forEach((feat) => {
			if (feat.isRequired) {
				required.push(feat)
			} else {
				optional.push(feat)
			}
		})

		const requiredMessage = `I'll need to install ${required.length} feature${
			required.length === 1 ? '' : 's'
		}.`

		const optionalMessage = `there are ${optional.length} optional feature${
			optional.length === 1 ? '' : 's'
		} that could be installed.`

		const mixedMessage = `I found ${required.length} required and ${option.length} optional features to install.`

		let message = mixedMessage

		if (optional.length === 0) {
			message = requiredMessage
		} else if (optional.length > 0 && required.length === 0) {
			message = optionalMessage
		}

		return `Before you can run \`${this.getCommandName()}\`, ${message} Don't worry, I'll walk you through it!`
	}

	private async installMissingDependency(
		toInstall: FeatureDependencyWithFeature
	): Promise<FeatureInstallResponse> {
		const { feature, isRequired } = toInstall

		if (isRequired) {
			const confirm = await this.ui.confirm(
				`Install the ${feature.nameReadable} feature?`
			)

			if (!confirm) {
				debugger
				throw new SpruceError({
					code: 'COMMAND_ABORTED',
					command: this.getCommandName(),
				})
			}
		} else {
			const response = await this.ui.prompt({
				type: 'select',
				defaultValue: 'yes',
				label: `Install the ${feature.nameReadable} feature?`,
				options: {
					choices: [
						{
							value: 'yes',
							label: 'Yes',
						},
						{
							value: 'no',
							label: 'No',
						},
						{
							value: 'alwaysSkip',
							label: 'Always skip',
						},
					],
				},
			})

			if (response !== 'yes') {
				this.ui.renderLine('Cool, skipping for now.')
				const installResponse: FeatureInstallResponse = {}
				return installResponse
			}
		}

		let installOptions = {}

		if (feature.optionsDefinition) {
			installOptions = await this.collectAnswers(
				feature.optionsDefinition,
				undefined
			)
		}

		this.ui.clear()
		this.ui.startLoading(`Installing ${feature.nameReadable}...`)

		const installResults = await this.featureInstaller.install({
			installFeatureDependencies: false,
			features: [
				{
					code: feature.code,
					//@ts-ignore
					options: installOptions,
				},
			],
		})

		this.ui.stopLoading()

		return installResults
	}

	private async getDependenciesNotInstalled(): Promise<
		FeatureDependencyWithFeature[]
	> {
		const dependencies = this.featureInstaller.getFeatureDependencies(
			this.featureCode
		)

		const installedStatuses = await Promise.all(
			dependencies.map(async (dependency) => {
				const feature = this.featureInstaller.getFeature(dependency.code)
				const isInstalled = await this.featureInstaller.isInstalled(
					dependency.code
				)

				return !isInstalled ? { feature, ...dependency } : null
			})
		)

		const notInstalled = installedStatuses.filter(
			(feature) => !!feature
		) as FeatureDependencyWithFeature[]

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
