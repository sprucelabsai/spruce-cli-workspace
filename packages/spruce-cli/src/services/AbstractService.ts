import { Mercury } from '@sprucelabs/mercury'
import { Templates } from '@sprucelabs/spruce-templates'
import { IUtilities } from '#spruce/autoloaders/utilities'
import { IServices } from '#spruce/autoloaders/services'
import log from '../lib/log'
import Autoloadable from '../Autoloadable'

export interface IServiceOptions {
	cwd: string
	mercury: Mercury
	utilities: IUtilities
	templates: Templates
}

export default abstract class AbstractService extends Autoloadable {
	public mercury: Mercury
	public utilities: IUtilities
	public services!: IServices
	public templates: Templates

	public constructor(options: IServiceOptions) {
		super(options)
		const { cwd, mercury, utilities, templates } = options
		log.trace({ options })
		this.mercury = mercury
		this.cwd = cwd
		this.utilities = utilities
		this.templates = templates
	}

	public async afterAutoload(siblings: IServices) {
		this.services = siblings
	}
}
