import SpruceError from '../errors/SpruceError'
import AbstractFeature from '../features/AbstractFeature'
import FeatureInstaller from '../features/FeatureInstaller'
import { FeatureAction } from '../features/features.types'

export default class InstallCheckingActionDecorator implements FeatureAction {
	public name = 'install-checking-action-facade'

	private childAction: FeatureAction
	private parent: AbstractFeature
	private featureInstaller: FeatureInstaller

	public get optionsSchema() {
		return this.childAction.optionsSchema
	}

	public constructor(
		childAction: FeatureAction,
		parent: AbstractFeature,
		featureInstaller: FeatureInstaller
	) {
		if (!childAction || !childAction.execute) {
			throw new SpruceError({
				code: 'GENERIC',
				friendlyMessage: `${parent.nameReadable} failed to load action.`,
			})
		}

		this.childAction = childAction
		this.name = childAction.name
		this.parent = parent
		this.featureInstaller = featureInstaller
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

		return this.childAction.execute(options)
	}
}
