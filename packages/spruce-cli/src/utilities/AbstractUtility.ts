import { Log } from '@sprucelabs/log'

export interface IUtilityOptions {
	cwd: string
	log: Log
}

export default class AbstractUtility {
	public cwd: string
	public log: Log
	public constructor(options: IUtilityOptions) {
		const { cwd, log } = options
		this.cwd = cwd
		this.log = log
	}
}
