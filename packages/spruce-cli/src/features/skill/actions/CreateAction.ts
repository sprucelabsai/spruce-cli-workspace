import AbstractFeatureAction from '../../../featureActions/AbstractFeatureAction'
import { IFeatureActionExecuteResponse } from '../../features.types'

export default class CreateAction extends AbstractFeatureAction {
	public name = 'create'
	public optionsDefinition = undefined

	public execute(): Promise<IFeatureActionExecuteResponse> {
		return Promise.resolve({})
	}
}
