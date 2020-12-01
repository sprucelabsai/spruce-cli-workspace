import ServiceFactory from '../services/ServiceFactory'
import { StoreOptions } from './AbstractStore'
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

	public constructor(options: {
		cwd: string
		serviceFactory: ServiceFactory
		homeDir: string
	}) {
		const { cwd, serviceFactory, homeDir } = options

		this.cwd = cwd
		this.serviceFactory = serviceFactory
		this.homeDir = homeDir
	}

	public Store<C extends StoreCode>(code: C, cwd?: string): StoreMap[C] {
		const options: StoreOptions = {
			cwd: cwd ?? this.cwd,
			serviceFactory: this.serviceFactory,
			homeDir: this.homeDir,
		}
		const store = new storeMap[code](options)

		return store as StoreMap[C]
	}
}
