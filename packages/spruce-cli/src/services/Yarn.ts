import AbstractService from './AbstractService'

export default class YarnService extends AbstractService {
	/** install a package */
	public async install(pkg: string) {
		this.log.warn(
			`Installing ${pkg} failed because YarnService.install is not done yet`
		)
	}
}
