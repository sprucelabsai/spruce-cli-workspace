import AbstractService from './AbstractService'
import yarn from 'yarn-programmatic'

export default class YarnService extends AbstractService {
	/** Install a package */
	public async install(pkg: string) {
		this.log.warn(
			`Installing ${pkg} failed because YarnService.install is not done yet`
		)
		await yarn.add(pkg)
	}

	public async lint() {
		await yarn.run('lint:fix', [], {})
	}
}
