import { Mercury } from '@sprucelabs/mercury'
import { IUtilities } from '#spruce/autoloaders/utilities'
import { IServices } from '../../.spruce/autoloaders/services'
import { IFeatures } from '../../.spruce/autoloaders/features'

export interface IServiceOptions {
	cwd: string
	mercury: Mercury
	utilities: IUtilities
	features: IFeatures
}

export default abstract class AbstractService {
	public mercury: Mercury
	public cwd: string
	public utilities: IUtilities
	public services!: IServices
	public features!: IFeatures

	public constructor(options: IServiceOptions) {
		const { cwd, mercury, utilities, features } = options
		this.mercury = mercury
		this.cwd = cwd
		this.utilities = utilities
		this.features = features
	}

	public afterAutoload(siblings: IServices) {
		this.services = siblings
	}
}
