import { Mercury } from '@sprucelabs/mercury'
import { Templates } from '@sprucelabs/spruce-templates'
import { IAutoloaded } from '#spruce/autoloaders'
import { IFeatures } from '#spruce/autoloaders/features'
import { IServices } from '#spruce/autoloaders/services'
import { IUtilities } from '#spruce/autoloaders/utilities'
import { IMyEventContract } from '#spruce/events/events.types'
import Autoloadable from '../Autoloadable'
import log from '../lib/log'
import TerminalUtility from '../utilities/TerminalUtility'

export interface IServiceOptions {
	cwd: string
	mercury: Mercury<IMyEventContract>
	templates: Templates
}

export default abstract class AbstractService extends Autoloadable {
	public mercury: Mercury<IMyEventContract>
	public utilities!: IUtilities
	public services!: IServices
	public features!: IFeatures
	public templates: Templates
	/** Convenience method that references this.utilities.terminal */
	public term!: TerminalUtility

	public constructor(options: IServiceOptions) {
		super(options)
		const { cwd, mercury, templates } = options
		log.trace({ options })
		this.mercury = mercury
		this.cwd = cwd
		this.templates = templates
	}

	public afterAutoload(autoloaded: IAutoloaded) {
		this.services = autoloaded.services
		this.features = autoloaded.features
		this.utilities = autoloaded.utilities
		this.term = this.utilities.terminal
	}
}
