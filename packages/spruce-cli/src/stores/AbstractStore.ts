import { MercuryClient } from '@sprucelabs/mercury-client'
import { EventContract } from '@sprucelabs/mercury-types'
import ServiceFactory, {
	ServiceProvider,
	Service,
	ServiceMap,
} from '../services/ServiceFactory'

export interface StoreOptions {
	serviceFactory: ServiceFactory
	cwd: string
	homeDir: string
	apiClientFactory: ApiClientFactory
}

export type ApiClient = MercuryClient<EventContract>
export type ApiClientFactory = () => Promise<ApiClient>

export default abstract class AbstractStore implements ServiceProvider {
	protected cwd: string
	protected homeDir: string
	protected apiClientFactory: ApiClientFactory

	public abstract name: string

	private serviceFactory: ServiceFactory

	public constructor(options: StoreOptions) {
		this.cwd = options.cwd
		this.serviceFactory = options.serviceFactory
		this.homeDir = options.homeDir
		this.apiClientFactory = options.apiClientFactory
	}

	public Service<S extends Service>(type: S, cwd?: string): ServiceMap[S] {
		return this.serviceFactory.Service(cwd ?? this.cwd, type)
	}

	protected async connectToApi(): Promise<ApiClient> {
		return this.apiClientFactory()
	}
}
