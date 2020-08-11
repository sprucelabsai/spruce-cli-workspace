import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import SpruceError from '../errors/SpruceError'
import AbstractFeature from '../features/AbstractFeature'
import FeatureInstaller from '../features/FeatureInstaller'
import { IFeatureAction } from '../features/features.types'

export default class InstallCheckingActionDecorator implements IFeatureAction {
	public name = 'install-checking-action-facade'

	private childAction: IFeatureAction
	private parent: AbstractFeature
	private featureInstaller: FeatureInstaller

	public get optionsSchema() {
		return this.childAction.optionsSchema
	}

	public constructor(
		childAction: IFeatureAction,
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

		dependencies.push(this.parent.code)

		for (const featureCode of dependencies) {
			const isInstalled = await this.featureInstaller.isInstalled(featureCode)

			if (!isInstalled) {
				throw new SpruceError({
					// @ts-ignore
					code: `${namesUtil.toConst(featureCode)}_NOT_INSTALLED`,
					friendlyReason: `Looks like`,
				})
			}
		}

		return this.childAction.execute(options)
	}
}
