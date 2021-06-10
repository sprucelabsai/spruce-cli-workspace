import { GraphicsInterface } from '@sprucelabs/spruce-skill-utils'
import SpruceError from '../errors/SpruceError'
import { FeatureAction } from '../features/features.types'
import { BlockedCommands, OptionOverrides } from '../types/cli.types'
import AbstractFeature from './AbstractFeature'
import featuresUtil from './feature.utilities'

export default class OverrideActionDecorator implements FeatureAction {
	private blockedCommands?: BlockedCommands
	private optionOverrides?: OptionOverrides
	private ui?: GraphicsInterface

	public get invocationMessage() {
		return this.childAction.invocationMessage
	}

	public get commandAliases() {
		return this.childAction.commandAliases
	}

	private childAction: FeatureAction
	private parent: AbstractFeature

	public get optionsSchema() {
		return this.childAction.optionsSchema
	}

	public get code() {
		return this.childAction.code
	}

	public getChild() {
		return this.childAction
	}

	public constructor(options: {
		action: FeatureAction
		feature: AbstractFeature
		ui?: GraphicsInterface
		blockedCommands?: BlockedCommands
		optionOverrides?: OptionOverrides
	}) {
		const { action, feature, ui, blockedCommands, optionOverrides } = options

		if (!action || !action.execute) {
			throw new SpruceError({
				code: 'GENERIC',
				friendlyMessage: `${feature.nameReadable} failed to load action.`,
			})
		}

		this.childAction = action
		this.parent = feature
		this.blockedCommands = blockedCommands
		this.optionOverrides = optionOverrides
		this.ui = ui
	}

	private assertCommandIsNotBlocked() {
		const commands = this.getCommands()

		for (const commandStr of commands) {
			if (this.blockedCommands?.[commandStr]) {
				throw new SpruceError({
					code: 'COMMAND_BLOCKED',
					command: commandStr,
					hint: this.blockedCommands[commandStr],
				})
			}
		}
	}

	public execute = async (optionsArg: any) => {
		this.assertCommandIsNotBlocked()

		let { ...options } = optionsArg

		options = this.mixinOptionOverrides(options)

		let response = await this.childAction.execute(options)

		return response
	}

	private getCommands() {
		return featuresUtil.generateCommandsIncludingAliases(this.parent.code, this)
	}

	private mixinOptionOverrides(optionsArgs: any) {
		let { ...options } = optionsArgs

		const commands = this.getCommands()

		for (const commandStr of commands) {
			const overrides = this.optionOverrides?.[commandStr]
			if (overrides) {
				this.ui?.renderLine(`Overrides found in package.json`)
				this.ui?.renderObject(overrides)
				options = {
					...options,
					...overrides,
				}
			}
		}

		return options
	}
}
