import AbstractFeatureAction from '../../../featureActions/AbstractFeatureAction'
import { IFeatureActionExecuteResponse } from '../../features.types'

export default class DashboardAction extends AbstractFeatureAction {
	public name = 'dashboard'
	public optionsDefinition = undefined

	public execute(): Promise<IFeatureActionExecuteResponse> {
		return Promise.resolve({})
	}
}
