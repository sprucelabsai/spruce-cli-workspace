import ServiceFactory, {
	ServiceProvider,
	Service,
	ServiceMap,
} from '../services/ServiceFactory'

export interface StoreOptions {
	serviceFactory: ServiceFactory
	cwd: string
}

export default abstract class AbstractStore implements ServiceProvider {
	protected cwd: string
	public abstract name: string

	private serviceFactory: ServiceFactory

	public constructor(options: StoreOptions) {
		this.cwd = options.cwd
		this.serviceFactory = options.serviceFactory
	}

	public Service<S extends Service>(type: S, cwd?: string): ServiceMap[S] {
		return this.serviceFactory.Service(cwd ?? this.cwd, type)
	}
}
