import { Mercury } from '@sprucelabs/mercury'
import { Log } from '@sprucelabs/log'
import { IUtilities } from '../utilities'

export interface IServiceOptions {
	cwd: string
	mercury: Mercury
	log: Log
	utilities: IUtilities
}

export default abstract class AbstractService {
	public mercury: Mercury
	public cwd: string
	public log: Log
	public utilities: IUtilities

	public constructor(options: IServiceOptions) {
		const { cwd, log, mercury, utilities } = options
		this.mercury = mercury
		this.cwd = cwd
		this.log = log
		this.utilities = utilities
	}
}
