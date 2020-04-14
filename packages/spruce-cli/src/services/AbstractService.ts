import { Mercury } from '@sprucelabs/mercury'
import { Log } from '@sprucelabs/log'
import { IUtilities } from '#spruce/autoloaders/utilities'

export interface IServiceOptions {
	cwd: string
	mercury: Mercury
	log: Log
	utilities: IUtilities
}

export default abstract class AbstractService {
	public mercury: Mercury
	public cwd: string
	public utilities: IUtilities

	public constructor(options: IServiceOptions) {
		const { cwd, mercury, utilities } = options
		this.mercury = mercury
		this.cwd = cwd
		this.utilities = utilities
	}
}
