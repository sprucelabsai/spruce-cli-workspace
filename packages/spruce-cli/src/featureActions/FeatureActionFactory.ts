import {
	IFeatureAction,
	IFeatureActionOptions,
} from '../features/features.types'
import diskUtil from '../utilities/disk.utility'
import namesUtil from '../utilities/names.utility'
import AbstractFeatureAction from './AbstractFeatureAction'
import InstallCheckingActionDecorator from './InstallCheckingActionDecorator'

export interface IFeatureActionFactoryOptions extends IFeatureActionOptions {
	actionsDir: string
}

export default class FeatureActionFactory {
	private actionsDir: string
	private actionOptions: IFeatureActionOptions

	public constructor(options: IFeatureActionFactoryOptions) {
		this.actionsDir = options.actionsDir
		this.actionOptions = options
	}

	public Action(name: string): IFeatureAction {
		const classPath = diskUtil.resolvePath(
			this.actionsDir,
			`${namesUtil.toPascal(name)}Action`
		)

		const Class: new (
			options: IFeatureActionOptions
		) => AbstractFeatureAction = require(classPath).default

		const action = new Class(this.actionOptions)
		const installCheckingFacade = new InstallCheckingActionDecorator(
			action,
			this.actionOptions.parent,
			this.actionOptions.featureManager
		)

		return installCheckingFacade
	}
}
