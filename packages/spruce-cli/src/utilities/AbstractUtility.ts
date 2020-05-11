import Autoloadable from '../Autoloadable'

export interface IUtilityOptions {
	cwd: string
}

export default abstract class AbstractUtility extends Autoloadable {
	public constructor(options: IUtilityOptions) {
		super(options)
		const { cwd } = options
		this.cwd = cwd
	}
}
