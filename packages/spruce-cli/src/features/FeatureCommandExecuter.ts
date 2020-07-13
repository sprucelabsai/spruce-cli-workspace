import AbstractFeature from './AbstractFeature'
import { IFeatureAction } from './features.types'

export default class FeatureCommandExecuter {
	//@ts-ignore
	private feature: AbstractFeature
	//@ts-ignore
	private action: IFeatureAction

	public constructor(feature: AbstractFeature, action: IFeatureAction) {
		this.feature = feature
		this.action = action
	}
}
