import SpruceError from '../errors/SpruceError'
import AbstractFeature from '../features/AbstractFeature'
import FeatureInstaller from '../features/FeatureInstaller'
import { FeatureAction } from '../features/features.types'
import { GlobalEmitter } from '../GlobalEmitter'

export default class InstallCheckingActionDecorator implements FeatureAction {
	public code = 'install-checking-action-facade'
	private emitter: GlobalEmitter

	public get commandAliases() {
		return this.childAction.commandAliases
	}

	private childAction: FeatureAction
	private parent: AbstractFeature
	private featureInstaller: FeatureInstaller

	public get optionsSchema() {
		return this.childAction.optionsSchema
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

	public execute = async (options: any) => {
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

		await this.emitter.emit('feature.will-execute', {
			featureCode: this.parent.code,
			actionCode: this.code,
		})

		const response = await this.childAction.execute(options)

		await this.emitter.emit('feature.did-execute', {
			results: response,
			featureCode: this.parent.code,
			actionCode: this.code,
		})

		return response
	}
}
