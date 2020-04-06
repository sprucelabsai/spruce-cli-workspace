import { Mercury } from '@sprucelabs/mercury'
import { Log } from '@sprucelabs/log'

export interface IServiceOptions {
	cwd: string
	mercury: Mercury
	log: Log
}

export default abstract class AbstractService {
	public mercury: Mercury
	public cwd: string
	public log: Log

	public constructor(options: IServiceOptions) {
		const { cwd, log, mercury } = options
		this.mercury = mercury
		this.cwd = cwd
		this.log = log
	}
}
