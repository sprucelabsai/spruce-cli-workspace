import { Mercury } from '@sprucelabs/mercury'
import SpruceError from '../errors/SpruceError'
import ServiceFactory, {
	IServiceProvider,
	Service,
	IServiceMap,
} from '../factories/ServiceFactory'

export interface IStoreOptions {
	mercury: Mercury
	serviceFactory: ServiceFactory
	cwd: string
}

export default abstract class AbstractStore implements IServiceProvider {
	protected mercury: Mercury
	protected cwd: string

	private serviceFactory: ServiceFactory

	public constructor(options: IStoreOptions) {
		this.mercury = options.mercury
		this.cwd = options.cwd
		this.serviceFactory = options.serviceFactory
	}

	public Service<S extends Service>(type: S, cwd?: string): IServiceMap[S] {
		return this.serviceFactory.Service(cwd ?? this.cwd, type)
	}

	protected async mercuryForUser(token: string): Promise<Mercury> {
		const { connectionOptions } = this.mercury
		if (!connectionOptions) {
			throw new SpruceError({
				code: 'GENERIC_MERCURY',
				friendlyMessage:
					'user store was trying to auth on mercury but had no options (meaning it was never connected)',
			})
		}
		// Connect with new creds
		await this.mercury.connect({
			...(connectionOptions || {}),
			credentials: { token },
		})

		return this.mercury
	}
}
