import ServiceFactory, {
	ServiceProvider,
	Service,
	ServiceMap,
} from '../services/ServiceFactory'

export interface StoreOptions {
	serviceFactory: ServiceFactory
	cwd: string
	homeDir: string
}

export default abstract class AbstractStore implements ServiceProvider {
	protected cwd: string
	protected homeDir: string

	public abstract name: string

	private serviceFactory: ServiceFactory

	public constructor(options: StoreOptions) {
		this.cwd = options.cwd
		this.serviceFactory = options.serviceFactory
		this.homeDir = options.homeDir
	}

	public Service<S extends Service>(type: S, cwd?: string): ServiceMap[S] {
		return this.serviceFactory.Service(cwd ?? this.cwd, type)
	}
}
