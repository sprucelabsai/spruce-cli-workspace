import { Mercury } from '@sprucelabs/mercury'
import { Templates } from '@sprucelabs/spruce-templates'
import { IUtilities } from '#spruce/autoloaders/utilities'
import { IServices } from '../../.spruce/autoloaders/services'
import { IFeatures } from '../../.spruce/autoloaders/features'

export interface IServiceOptions {
	cwd: string
	mercury: Mercury
	utilities: IUtilities
	features: IFeatures
	templates: Templates
}

export default abstract class AbstractService {
	public mercury: Mercury
	public cwd: string
	public utilities: IUtilities
	public services!: IServices
	public features!: IFeatures
	public templates: Templates

	public constructor(options: IServiceOptions) {
		const { cwd, mercury, utilities, features, templates } = options
		this.mercury = mercury
		this.cwd = cwd
		this.utilities = utilities
		this.features = features
		this.templates = templates
	}

	public afterAutoload(siblings: IServices) {
		this.services = siblings
	}
}
