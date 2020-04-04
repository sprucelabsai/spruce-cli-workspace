import { Mercury } from '@sprucelabs/mercury'

export default abstract class AbstractService {
	public mercury: Mercury
	public cwd: string

	public constructor(options: { cwd: string; mercury: Mercury }) {
		this.mercury = options.mercury
		this.cwd = options.cwd
	}
}
