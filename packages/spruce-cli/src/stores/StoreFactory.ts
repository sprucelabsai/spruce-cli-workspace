import ServiceFactory from '../services/ServiceFactory'
import { StoreOptions, ApiClientFactory } from './AbstractStore'
import EventStore from './EventStore'
import OnboardingStore from './OnboardingStore'
import SchemaStore from './SchemaStore'

export interface StoreMap {
	onboarding: OnboardingStore
	schema: SchemaStore
	event: EventStore
}

export type StoreCode = keyof StoreMap

const storeMap = {
	onboarding: OnboardingStore,
	schema: SchemaStore,
	event: EventStore,
}

export default class StoreFactory {
	private serviceFactory: ServiceFactory
	private cwd: string
	private homeDir: string
	private apiClientFactory: ApiClientFactory

	public constructor(options: {
		cwd: string
		serviceFactory: ServiceFactory
		homeDir: string
		apiClientFactory: ApiClientFactory
	}) {
		const { cwd, serviceFactory, homeDir, apiClientFactory } = options

		this.cwd = cwd
		this.serviceFactory = serviceFactory
		this.homeDir = homeDir
		this.apiClientFactory = apiClientFactory
	}

	public Store<C extends StoreCode>(code: C, cwd?: string): StoreMap[C] {
		const options: StoreOptions = {
			cwd: cwd ?? this.cwd,
			serviceFactory: this.serviceFactory,
			homeDir: this.homeDir,
			apiClientFactory: this.apiClientFactory,
		}
		const store = new storeMap[code](options)

		return store as StoreMap[C]
	}
}
