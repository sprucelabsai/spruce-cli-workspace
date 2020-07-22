import AbstractFeatureAction from '../../../featureActions/AbstractFeatureAction'
import { IFeatureActionExecuteResponse } from '../../features.types'

export default class SyncAction extends AbstractFeatureAction {
	public name = 'sync'
	public optionsDefinition = undefined

	public execute(): Promise<IFeatureActionExecuteResponse> {
		throw new Error('Method not implemented.')
	}
}
