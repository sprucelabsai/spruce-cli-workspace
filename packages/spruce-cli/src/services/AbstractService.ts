import { Mercury } from '@sprucelabs/mercury'
import { Templates } from '@sprucelabs/spruce-templates'
import { IUtilities } from '#spruce/autoloaders/utilities'
import { IServices } from '../../.spruce/autoloaders/services'

export interface IServiceOptions {
	cwd: string
	mercury: Mercury
	utilities: IUtilities
	templates: Templates
}

export default abstract class AbstractService {
	public mercury: Mercury
	public cwd: string
	public utilities: IUtilities
	public services!: IServices
	public templates: Templates

	public constructor(options: IServiceOptions) {
		const { cwd, mercury, utilities, templates } = options
		this.mercury = mercury
		this.cwd = cwd
		this.utilities = utilities
		this.templates = templates
	}

	public async afterAutoload(siblings: IServices) {
		this.services = siblings
	}
}
