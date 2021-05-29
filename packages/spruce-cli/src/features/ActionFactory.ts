import { Schema } from '@sprucelabs/schema'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import SpruceError from '../errors/SpruceError'
import {
	FeatureAction,
	FeatureActionOptions,
	FeatureCode,
} from '../features/features.types'
import { GlobalEmitter } from '../GlobalEmitter'
import AbstractAction from './AbstractAction'
import ActionExecuter from './ActionExecuter'
import FeatureInstaller from './FeatureInstaller'
import InstallCheckingActionDecorator from './InstallCheckingActionDecorator'

export interface FeatureActionFactoryOptions
	extends Omit<
		FeatureActionOptions,
		'parent' | 'actionExecuter' | 'featureInstaller'
	> {
	emitter: GlobalEmitter
}

export default class ActionFactory {
	private actionOptions: FeatureActionFactoryOptions

	public constructor(options: FeatureActionFactoryOptions) {
		this.actionOptions = options
	}

	public Action<F extends FeatureCode, S extends Schema = Schema>(options: {
		featureCode: F
		actionCode: string
		actionExecuter: ActionExecuter
		featureInstaller: FeatureInstaller
	}): FeatureAction<S> {
		const { featureCode, actionCode, actionExecuter, featureInstaller } =
			options

		const feature = featureInstaller.getFeature(featureCode)

		if (!feature.actionsDir) {
			throw new Error(
				`Your ${featureCode} features needs \`public actionsDir = diskUtil.resolvePath(__dirname, 'actions')\``
			)
		}

		const classPath = diskUtil.resolvePath(
			feature.actionsDir,
			`${namesUtil.toPascal(actionCode)}Action`
		)

		const Class: new (options: FeatureActionOptions) =>
			| AbstractAction
			| undefined = require(classPath).default

		if (!Class) {
			throw new SpruceError({
				code: 'GENERIC',
				friendlyMessage: `I could not find any action named '${actionCode}' for the ${feature.code} feature. Make sure it's the default export and extends AbstractAction.`,
			})
		}

		const action = new Class({
			...this.actionOptions,
			actionExecuter,
			parent: feature,
			featureInstaller,
		})

		if (!action) {
			throw new SpruceError({
				code: 'GENERIC',
				friendlyMessage: `I could not instantiate ${actionCode} action on ${feature.code} feature.`,
			})
		}

		if (!action.execute) {
			throw new SpruceError({
				code: 'GENERIC',
				friendlyMessage: `It looks like the ${feature.code} feature's '${actionCode}' action does not properly extend AbstractAction.`,
			})
		}

		const installCheckingFacade = new InstallCheckingActionDecorator(
			action,
			feature,
			featureInstaller
		)

		return installCheckingFacade as FeatureAction<S>
	}
}
