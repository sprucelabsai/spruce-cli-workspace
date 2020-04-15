export interface IUtilityOptions {
	cwd: string
}

export default abstract class AbstractUtility {
	public cwd: string
	public constructor(options: IUtilityOptions) {
		const { cwd } = options
		this.cwd = cwd
	}
}
