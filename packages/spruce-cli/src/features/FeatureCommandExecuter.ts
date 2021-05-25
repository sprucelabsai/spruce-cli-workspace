import { Schema, SchemaPartialValues, SchemaValues } from '@sprucelabs/schema'
import { eventResponseUtil } from '@sprucelabs/spruce-event-utils'
import merge from 'lodash/merge'
import FormComponent from '../components/FormComponent'
import { CLI_HERO } from '../constants'
import SpruceError from '../errors/SpruceError'
import { GlobalEmitter } from '../GlobalEmitter'
import { GraphicsInterface } from '../types/cli.types'
import formUtil from '../utilities/form.utility'
import AbstractFeature, { FeatureDependency } from './AbstractFeature'
import featuresUtil from './feature.utilities'
import FeatureInstaller from './FeatureInstaller'
import {
	FeatureCode,
	FeatureInstallResponse,
	FeatureAction,
	FeatureActionResponse,
	FeatureMap,
} from './features.types'

type FeatureCommandExecuteOptions<
	F extends FeatureCode,
	S extends Schema | undefined = FeatureMap[F]['optionsSchema']
> = S extends Schema ? SchemaPartialValues<S> : undefined

type FeatureDependencyWithFeature = FeatureDependency & {
	feature: AbstractFeature
}

export default class FeatureCommandExecuter<F extends FeatureCode> {
	private featureCode: F
	private actionCode: string
	private ui: GraphicsInterface
	private featureInstaller: FeatureInstaller
	private emitter: GlobalEmitter

	public constructor(options: {
		term: GraphicsInterface
		featureCode: F
		actionCode: string
		featureInstaller: FeatureInstaller
		emitter: GlobalEmitter
	}) {
		this.featureCode = options.featureCode
		this.actionCode = options.actionCode
		this.ui = options.term
		this.featureInstaller = options.featureInstaller
		this.emitter = options.emitter
	}

	public async execute(
		options?: Record<string, any> & FeatureCommandExecuteOptions<F>
	): Promise<FeatureInstallResponse & FeatureActionResponse> {
		await this.emitter.emit('feature.will-execute', {
			featureCode: this.featureCode,
			actionCode: this.actionCode,
		})

		let response = await this.installOrMarkAsSkippedMissingDependencies()

		const feature = this.featureInstaller.getFeature(this.featureCode)
		const action = feature.Action(this.actionCode)

		this.clearAndRenderHeadline(action)

		const isInstalled = await this.featureInstaller.isInstalled(
			this.featureCode
		)
		const installOptions =
			await this.askAboutMissingFeatureOptionsIfFeatureIsNotInstalled(
				isInstalled,
				feature,
				options
			)

		let answers = await this.askAboutMissingActionOptions(action, options)

		if (!isInstalled) {
			const ourFeatureResults = await this.installOurFeature(installOptions)
			response = merge(response, ourFeatureResults)
		}

		const executeResults = await action.execute({
			...answers,
			shouldEmitExecuteEvents: false,
		})
		response = merge(response, executeResults)

		const didExecuteResults = await this.emitter.emit('feature.did-execute', {
			results: response,
			featureCode: this.featureCode,
			actionCode: this.actionCode,
		})

		const { payloads } = eventResponseUtil.getAllResponsePayloadsAndErrors(
			didExecuteResults,
			SpruceError
		)

		response = merge(response, didExecuteResults, ...payloads)

		this.ui.stopLoading()

		this.ui.clear()
		this.ui.renderCommandSummary({
			featureCode: this.featureCode,
			actionCode: this.actionCode,
			headline: executeResults.headline ?? `${action.code} finished!`,
			...response,
		})

		return response
	}

	private clearAndRenderHeadline(action: FeatureAction<Schema>) {
		this.ui.clear()
		this.ui.renderHero(CLI_HERO)
		this.ui.renderHeadline(action.invocationMessage)
	}

	private async askAboutMissingActionOptions(
		action: FeatureAction<Schema>,
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

		this.ui.renderHero(CLI_HERO)
		this.ui.startLoading(`Installing ${this.featureCode} feature...`)

		const installResults = await this.featureInstaller.install({
			installFeatureDependencies: false,
			features: [
				{
					code: this.featureCode as any,
					options: installOptions as any,
				},
			],
			didUpdateHandler: (message) => this.ui.startLoading(message),
		})

		this.ui.stopLoading()

		return installResults
	}

	private async askAboutMissingFeatureOptionsIfFeatureIsNotInstalled(
		isInstalled: boolean,
		feature: FeatureMap[F],
		options: (Record<string, any> & FeatureCommandExecuteOptions<F>) | undefined
	) {
		let installOptions = { ...options }
		if (!isInstalled) {
			if (feature.optionsSchema) {
				const answers = await this.collectAnswers(
					feature.optionsSchema,
					options
				)

				installOptions = { ...installOptions, ...answers }
			}
		}
		return installOptions
	}

	private getCommandName() {
		return featuresUtil.generateCommand(this.featureCode, this.actionCode)
	}

	private async installOrMarkAsSkippedMissingDependencies(): Promise<FeatureInstallResponse> {
		const notInstalled = await this.getDependenciesNotInstalled()

		let response: FeatureInstallResponse = {}
		let installCount = 0

		if (notInstalled.length > 0) {
			this.ui.renderLine(
				this.generateConfirmInstallMessage(notInstalled) + '\n'
			)

			while (notInstalled.length > 0) {
				const toInstall = notInstalled.shift()
				if (!toInstall) {
					// for typescript
					throw new Error('Dependent feature error')
				}

				const wasInstalled = await this.featureInstaller.isInstalled(
					toInstall.code
				)

				if (
					!wasInstalled &&
					!this.featureInstaller.isMarkedAsSkipped(toInstall.code)
				) {
					const installResults =
						await this.installOrMarkAsSkippedMissingDependency(toInstall)
					response = merge(response, installResults)
					installCount++
				}
			}

			if (installCount > 0) {
				this.ui.clear()

				await this.ui.waitForEnter(
					`Phew, now that we're done with that, lets get back to ${this.getCommandName()}!`
				)

				this.ui.clear()
			}
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

		const mixedMessage = `I found ${required.length} required and ${optional.length} optional features to install.`

		let message = mixedMessage

		if (optional.length === 0) {
			message = requiredMessage
		} else if (optional.length > 0 && required.length === 0) {
			message = optionalMessage
		}

		return `Before you can run \`${this.getCommandName()}\`, ${message} Don't worry, I'll walk you through it!`
	}

	private async installOrMarkAsSkippedMissingDependency(
		toInstall: FeatureDependencyWithFeature
	): Promise<FeatureInstallResponse> {
		const { feature, isRequired } = toInstall

		if (isRequired) {
			const confirm = await this.ui.confirm(
				`Install the ${feature.nameReadable} feature?`
			)

			if (!confirm) {
				throw new SpruceError({
					code: 'COMMAND_ABORTED',
					command: this.getCommandName(),
				})
			}
		} else {
			const response = await this.ui.prompt({
				type: 'select',
				defaultValue: 'yes',
				label: `Install the ${feature.nameReadable} feature? (optional)`,
				options: {
					choices: [
						{
							value: 'yes',
							label: 'Yes',
						},
						{
							value: 'skip',
							label: 'Skip',
						},
						{
							value: 'alwaysSkip',
							label: 'Always skip',
						},
					],
				},
			})

			if (response !== 'yes') {
				this.ui.renderLine(
					response === 'alwaysSkip'
						? 'Skipping forever!'
						: 'Cool, skipping for now.'
				)

				if (response === 'skip') {
					this.featureInstaller.markAsSkippedThisRun(feature.code)
				} else {
					this.featureInstaller.markAsPermanentlySkipped(feature.code)
				}

				const installResponse: FeatureInstallResponse = {}
				return installResponse
			}
		}

		let installOptions = {}

		if (feature.optionsSchema) {
			installOptions = await this.collectAnswers(
				feature.optionsSchema,
				undefined
			)
		}

		this.ui.startLoading(`Installing ${feature.nameReadable}...`)

		const installResults = await this.featureInstaller.install({
			installFeatureDependencies: false,
			didUpdateHandler: (message: string) => {
				this.ui.startLoading(message)
			},
			features: [
				{
					code: feature.code as any,
					options: installOptions as any,
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

				const isMarkedAsSkipped = this.featureInstaller.isMarkedAsSkipped(
					feature.code
				)

				if (isMarkedAsSkipped) {
					return null
				}

				return !isInstalled ? { feature, ...dependency } : null
			})
		)

		const notInstalled = installedStatuses.filter(
			(feature) => !!feature
		) as FeatureDependencyWithFeature[]

		return notInstalled
	}

	private async collectAnswers<S extends Schema>(
		schema: S,
		options: FeatureCommandExecuteOptions<F, S> | undefined
	) {
		const cleaned: Record<string, any> = {}
		Object.keys(options ?? {}).forEach((key) => {
			//@ts-ignore
			if (typeof options[key] !== 'undefined') {
				//@ts-ignore
				cleaned[key] = options[key]
			}
		})

		const fieldNames = Object.keys(schema.fields ?? {})
		const providedFieldNames = cleaned ? Object.keys(cleaned ?? {}) : []
		const fieldsToPresent = fieldNames.filter(
			(name) =>
				providedFieldNames.indexOf(name) === -1 &&
				schema.fields?.[name].isRequired === true &&
				schema.fields?.[name].isPrivate !== true
		)

		let answers = {}
		if (fieldsToPresent.length > 0) {
			const featureForm = new FormComponent<S>({
				term: this.ui,
				schema,
				//@ts-ignore
				initialValues: cleaned,
				onWillAskQuestion: formUtil.onWillAskQuestionHandler.bind(
					formUtil
				) as any,
			})

			answers = await featureForm.present({
				showOverview: false,
				// @ts-ignore
				fields: fieldsToPresent,
			})

			this.ui.renderLine('')
		}

		return { ...(cleaned ?? {}), ...answers } as SchemaValues<S>
	}
}
