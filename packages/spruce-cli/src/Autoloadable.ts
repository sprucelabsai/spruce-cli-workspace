export default abstract class Autoloadable {
	protected _cwd = ''

	public constructor(..._args: any) {}

	/** Get the current working directory */
	public get cwd() {
		return this._cwd
	}
	/** Set the current working directory */
	public set cwd(cwd: string) {
		this._cwd = cwd
	}
}
