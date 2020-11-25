import { Mercury } from '@sprucelabs/mercury'
import ServiceFactory from '../services/ServiceFactory'
import { StoreOptions } from './AbstractStore'
import OnboardingStore from './OnboardingStore'
import RemoteStore from './RemoteStore'
import SchemaStore from './SchemaStore'
import SkillStore from './SkillStore'
import UserStore from './UserStore'

export interface IStoreMap {
	onboarding: OnboardingStore
	remote: RemoteStore
	schema: SchemaStore
	skill: SkillStore
	user: UserStore
}

export type StoreCode = keyof IStoreMap

export default class StoreFactory {
	private mercury: Mercury
	private serviceFactory: ServiceFactory
	private cwd: string
	private storeMap = {
		onboarding: OnboardingStore,
		remote: RemoteStore,
		schema: SchemaStore,
		skill: SkillStore,
		user: UserStore,
	}

	public constructor(
		cwd: string,
		mercury: Mercury,
		serviceFactory: ServiceFactory
	) {
		this.cwd = cwd
		this.mercury = mercury
		this.serviceFactory = serviceFactory
	}

	public Store<C extends StoreCode>(code: C, cwd?: string): IStoreMap[C] {
		const options: StoreOptions = {
			cwd: cwd ?? this.cwd,
			serviceFactory: this.serviceFactory,
			mercury: this.mercury,
		}
		const store = new this.storeMap[code](options)

		return store as IStoreMap[C]
	}
}
