import EventStore from '../features/event/stores/EventStore'
import OnboardingStore from '../features/onboard/stores/OnboardingStore'
import PersonStore from '../features/person/stores/PersonStore'
import SchemaStore from '../features/schema/stores/SchemaStore'
import SkillStore from '../features/skill/stores/SkillStore'
import { GlobalEmitter } from '../GlobalEmitter'
import ServiceFactory from '../services/ServiceFactory'
import { StoreOptions, ApiClientFactory } from './AbstractStore'

export interface StoreMap {
	onboarding: OnboardingStore
	schema: SchemaStore
	event: EventStore
	person: PersonStore
	skill: SkillStore
}

export type StoreCode = keyof StoreMap

const storeMap = {
	onboarding: OnboardingStore,
	schema: SchemaStore,
	event: EventStore,
	person: PersonStore,
	skill: SkillStore,
}

export default class StoreFactory {
	private serviceFactory: ServiceFactory
	private cwd: string
	private homeDir: string
	private apiClientFactory: ApiClientFactory
	private emitter: GlobalEmitter

	public constructor(options: {
		cwd: string
		serviceFactory: ServiceFactory
		homeDir: string
		apiClientFactory: ApiClientFactory
		emitter: GlobalEmitter
	}) {
		const { cwd, serviceFactory, homeDir, apiClientFactory, emitter } = options

		this.cwd = cwd
		this.serviceFactory = serviceFactory
		this.homeDir = homeDir
		this.apiClientFactory = apiClientFactory
		this.emitter = emitter
	}

	public Store<C extends StoreCode>(code: C, cwd?: string): StoreMap[C] {
		const options: StoreOptions = {
			cwd: cwd ?? this.cwd,
			serviceFactory: this.serviceFactory,
			homeDir: this.homeDir,
			apiClientFactory: this.apiClientFactory,
			emitter: this.emitter,
		}

		if (!storeMap[code]) {
			throw new Error(`Could not find store with code '${code}'.`)
		}
		const store = new storeMap[code](options)

		return store as StoreMap[C]
	}
}
