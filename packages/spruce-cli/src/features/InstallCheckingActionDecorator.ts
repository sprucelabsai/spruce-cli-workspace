import { eventResponseUtil } from '@sprucelabs/spruce-event-utils'
import SpruceError from '../errors/SpruceError'
import AbstractFeature from '../features/AbstractFeature'
import FeatureInstaller from '../features/FeatureInstaller'
import { FeatureAction } from '../features/features.types'
import { GlobalEmitter } from '../GlobalEmitter'
import mergeUtil from '../utilities/merge.utility'

export default class InstallCheckingActionDecorator implements FeatureAction {
	public code = 'install-checking-action-facade'
	private emitter: GlobalEmitter
	public get invocationMessage() {
		return this.childAction.invocationMessage
	}

	public get commandAliases() {
		return this.childAction.commandAliases
	}

	private childAction: FeatureAction
	private parent: AbstractFeature
	private featureInstaller: FeatureInstaller

	public get optionsSchema() {
		return this.childAction.optionsSchema
	}

	public getChild() {
		return this.childAction
	}

	public constructor(
		childAction: FeatureAction,
		parent: AbstractFeature,
		featureInstaller: FeatureInstaller,
		emitter: GlobalEmitter
	) {
		if (!childAction || !childAction.execute) {
			throw new SpruceError({
				code: 'GENERIC',
				friendlyMessage: `${parent.nameReadable} failed to load action.`,
			})
		}

		this.childAction = childAction
		this.code = childAction.code
		this.parent = parent
		this.featureInstaller = featureInstaller
		this.emitter = emitter
	}

	public execute = async (optionsArg: any) => {
		const { shouldEmitExecuteEvents = true, ...options } = optionsArg

		const dependencies = this.featureInstaller.getFeatureDependencies(
			this.parent.code
		)

		if (!this.featureInstaller.isMarkedAsSkipped(this.parent.code)) {
			dependencies.push({ code: this.parent.code, isRequired: true })

			for (const dependency of dependencies) {
				if (dependency.isRequired) {
					const [isInstalled, isSkipped] = await Promise.all([
						this.featureInstaller.isInstalled(dependency.code),
						this.featureInstaller.isMarkedAsSkipped(dependency.code),
					])

					if (!isInstalled && !isSkipped) {
						throw new SpruceError({
							code: 'FEATURE_NOT_INSTALLED',
							featureCode: dependency.code,
						})
					}
				}
			}
		}

		if (shouldEmitExecuteEvents) {
			await this.emitter.emit('feature.will-execute', {
				featureCode: this.parent.code,
				actionCode: this.code,
			})
		}

		let response = await this.childAction.execute(options)

		if (shouldEmitExecuteEvents) {
			const didExecuteResults = await this.emitter.emit('feature.did-execute', {
				results: response,
				featureCode: this.parent.code,
				actionCode: this.code,
			})

			const { payloads } = eventResponseUtil.getAllResponsePayloadsAndErrors(
				didExecuteResults,
				SpruceError
			)

			response = mergeUtil.mergeActionResults(response, ...payloads)
		}

		return response
	}
}
