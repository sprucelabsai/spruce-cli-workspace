import ServiceFactory from '../services/ServiceFactory'
import { StoreOptions } from './AbstractStore'
import OnboardingStore from './OnboardingStore'
import RemoteStore from './RemoteStore'
import SchemaStore from './SchemaStore'
import SkillStore from './SkillStore'
import UserStore from './UserStore'

export interface StoreMap {
	onboarding: OnboardingStore
	remote: RemoteStore
	schema: SchemaStore
	skill: SkillStore
	user: UserStore
}

export type StoreCode = keyof StoreMap

export default class StoreFactory {
	private serviceFactory: ServiceFactory
	private cwd: string
	private storeMap = {
		onboarding: OnboardingStore,
		remote: RemoteStore,
		schema: SchemaStore,
		skill: SkillStore,
		user: UserStore,
	}

	public constructor(options: { cwd: string; serviceFactory: ServiceFactory }) {
		const { cwd, serviceFactory } = options
		this.cwd = cwd
		this.serviceFactory = serviceFactory
	}

	public Store<C extends StoreCode>(code: C, cwd?: string): StoreMap[C] {
		const options: StoreOptions = {
			cwd: cwd ?? this.cwd,
			serviceFactory: this.serviceFactory,
		}
		const store = new this.storeMap[code](options)

		return store as StoreMap[C]
	}
}
