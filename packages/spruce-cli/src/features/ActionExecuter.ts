import { eventResponseUtil } from '@sprucelabs/spruce-event-utils'
import merge from 'lodash/merge'
import SpruceError from '../errors/SpruceError'
import { GlobalEmitter } from '../GlobalEmitter'
import { GraphicsInterface } from '../types/cli.types'
import actionUtil from '../utilities/action.utility'
import ActionFactory from './ActionFactory'
import ActionOptionAsker from './ActionQuestionAsker'
import FeatureInstaller from './FeatureInstaller'
import {
	FeatureCode,
	FeatureInstallResponse,
	FeatureAction,
	FeatureActionResponse,
} from './features.types'

export interface ActionExecuterOptions {
	ui: GraphicsInterface
	emitter: GlobalEmitter
	actionFactory: ActionFactory
	featureInstallerFactory: () => FeatureInstaller
	shouldAutoHandleDependencies?: boolean
}

export default class ActionExecuter {
	private emitter: GlobalEmitter
	private ui: GraphicsInterface
	private actionFactory: ActionFactory
	private featureInstallerFactory: () => FeatureInstaller
	private shouldAutoHandleDependencies: boolean

	public constructor(options: ActionExecuterOptions) {
		this.featureInstallerFactory = options.featureInstallerFactory
		this.emitter = options.emitter
		this.ui = options.ui
		this.actionFactory = options.actionFactory
		this.shouldAutoHandleDependencies =
			options.shouldAutoHandleDependencies ?? true
	}

	private getFeatureInstaller() {
		return this.featureInstallerFactory()
	}

	private async execute(options: {
		featureCode: FeatureCode
		actionCode: string
		action: any
		originalExecute: any
		options?: Record<string, any>
	}): Promise<FeatureInstallResponse & FeatureActionResponse> {
		const {
			featureCode,
			actionCode,
			action,
			originalExecute,
			options: actionOptions,
		} = options

		const installer = this.getFeatureInstaller()
		const isInstalled = await installer.isInstalled(featureCode)

		if (!isInstalled && !this.shouldAutoHandleDependencies) {
			throw new SpruceError({
				code: 'FEATURE_NOT_INSTALLED',
				featureCode,
				friendlyMessage: `You need to install the \`${featureCode}\` feature.`,
			})
		}

		const willExecuteResults = await this.emitter.emit('feature.will-execute', {
			featureCode,
			actionCode,
		})

		const { payloads: willExecutePayloads, errors } =
			eventResponseUtil.getAllResponsePayloadsAndErrors(
				willExecuteResults,
				SpruceError
			)

		if (errors?.length ?? 0 > 0) {
			return { errors }
		}

		actionUtil.assertNoErrorsInResponse(willExecuteResults)

		const feature = installer.getFeature(featureCode)

		const asker = new ActionOptionAsker({
			featureInstaller: installer,
			feature,
			actionCode,
			shouldAutoHandleDependencies: this.shouldAutoHandleDependencies,
			ui: this.ui,
		})

		let response =
			(await asker.installOrMarkAsSkippedMissingDependencies()) ?? {}

		const installOptions =
			(await asker.askAboutMissingFeatureOptionsIfFeatureIsNotInstalled(
				isInstalled,
				actionOptions
			)) ??
			actionOptions ??
			{}

		let answers =
			(await asker.askAboutMissingActionOptions(action, installOptions)) ??
			installOptions

		if (!isInstalled) {
			const ourFeatureResults =
				(await asker.installOurFeature(installOptions)) ?? {}
			response = merge(response, ourFeatureResults)
		}

		let executeResults: FeatureActionResponse = {}

		try {
			executeResults = await originalExecute({
				...answers,
				shouldEmitExecuteEvents: false,
			})
		} catch (err) {
			executeResults.errors = [err]
		}

		response = merge(response, executeResults)

		const didExecuteResults = await this.emitter.emit('feature.did-execute', {
			results: response,
			featureCode,
			actionCode,
		})

		const { payloads } = eventResponseUtil.getAllResponsePayloadsAndErrors(
			didExecuteResults,
			SpruceError
		)

		response = actionUtil.mergeActionResults(
			response,
			...willExecutePayloads,
			...payloads
		)

		return response
	}

	public Action<F extends FeatureCode>(
		featureCode: F,
		actionCode: string
	): FeatureAction {
		const featureInstaller = this.getFeatureInstaller()

		const actionFactory = this.actionFactory
		const action = actionFactory.Action({
			featureCode,
			actionCode,
			actionExecuter: this,
			featureInstaller,
		})

		const originalExecute = action.execute.bind(action)

		action.execute = async (options: any) => {
			return this.execute({
				featureCode,
				actionCode,
				action,
				originalExecute,
				options,
			})
		}

		return action as any
	}
}
