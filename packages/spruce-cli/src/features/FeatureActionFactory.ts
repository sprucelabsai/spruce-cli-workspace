import { Schema } from '@sprucelabs/schema'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import SpruceError from '../errors/SpruceError'
import {
	FeatureAction,
	IFeatureActionOptions,
} from '../features/features.types'
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

	public Action<S extends Schema = Schema>(name: string): FeatureAction<S> {
		const classPath = diskUtil.resolvePath(
			this.actionsDir,
			`${namesUtil.toPascal(name)}Action`
		)

		const Class: new (options: IFeatureActionOptions) =>
			| AbstractFeatureAction
			| undefined = require(classPath).default

		if (!Class) {
			throw new SpruceError({
				code: 'GENERIC',
				friendlyMessage: `I could not find any action named '${name}' for the ${this.actionOptions.parent.code} feature. Make sure it's the default export and extends AbstractFeatureAction.`,
			})
		}

		const action = new Class(this.actionOptions)
		if (!action) {
			throw new SpruceError({
				code: 'GENERIC',
				friendlyMessage: `I could not instantiate ${name} action on ${this.actionOptions.parent.code} feature.`,
			})
		}

		if (!action.execute) {
			throw new SpruceError({
				code: 'GENERIC',
				friendlyMessage: `It looks like the ${this.actionOptions.parent.code} feature's '${name}' action does not properly extend AbstractAction.`,
			})
		}

		const installCheckingFacade = new InstallCheckingActionDecorator(
			action,
			this.actionOptions.parent,
			this.actionOptions.featureInstaller
		)

		return installCheckingFacade as FeatureAction<S>
	}
}
