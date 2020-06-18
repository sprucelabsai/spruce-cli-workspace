import log from './singletons/log'

export default abstract class Autoloadable {
	protected _cwd = ''

	public constructor(..._args: any) {}

	/** Get the current working directory */
	public get cwd() {
		return this._cwd
	}
	/** Set the current working directory */
	public set cwd(cwd: string) {
		if (cwd) {
			this._cwd = cwd
		} else {
			log.debug('Trying to set CWD to undefined!')
		}
	}
}
