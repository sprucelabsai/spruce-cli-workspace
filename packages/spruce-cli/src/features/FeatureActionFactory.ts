import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import {
	IFeatureAction,
	IFeatureActionOptions,
} from '../features/features.types'
import diskUtil from '../utilities/disk.utility'
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

		const Class: new (options: IFeatureActionOptions) =>
			| AbstractFeatureAction
			| undefined = require(classPath).default

		if (!Class) {
			throw new Error(
				`action code: ${name} class not found on feature ${this.actionOptions.parent.code}. make sure it's the default export.`
			)
		}

		const action = new Class(this.actionOptions)
		if (!action) {
			throw new Error(
				`failed to instantiate ${name} action on ${this.actionOptions.parent.code} feature.`
			)
		}

		const installCheckingFacade = new InstallCheckingActionDecorator(
			action,
			this.actionOptions.parent,
			this.actionOptions.featureInstaller
		)

		return installCheckingFacade
	}
}
