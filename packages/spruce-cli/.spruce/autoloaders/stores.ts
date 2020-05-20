/* eslint-disable spruce/prefer-pascal-case-enums */
// Import necessary interface(s)
import { IStoreOptions } from '#spruce/../src/stores/AbstractStore'
// Import each matching class that will be autoloaded
import AutoloaderStore from '#spruce/../src/stores/AutoloaderStore'
import OnboardingStore from '#spruce/../src/stores/OnboardingStore'
import RemoteStore from '#spruce/../src/stores/RemoteStore'
import SchemaStore from '#spruce/../src/stores/SchemaStore'
import SkillStore from '#spruce/../src/stores/SkillStore'
import UserStore from '#spruce/../src/stores/UserStore'
import WatcherStore from '#spruce/../src/stores/WatcherStore'


export type Stores = AutoloaderStore | OnboardingStore | RemoteStore | SchemaStore | SkillStore | UserStore | WatcherStore

export interface IStores {
	autoloader: AutoloaderStore
	onboarding: OnboardingStore
	remote: RemoteStore
	schema: SchemaStore
	skill: SkillStore
	user: UserStore
	watcher: WatcherStore
}

export enum Store {
	Autoloader = 'autoloader',
	Onboarding = 'onboarding',
	Remote = 'remote',
	Schema = 'schema',
	Skill = 'skill',
	User = 'user',
	Watcher = 'watcher',
}

export default async function autoloader<
	K extends Store[]
>(options: {
	constructorOptions:   IStoreOptions
	after?: (instance: Stores) => Promise<void>
	only?: K
}): Promise<K extends undefined ? IStores : Pick<IStores, K[number]>> {
	const { constructorOptions, after, only } = options
	const siblings:Partial<IStores> = {}

	if (!only || only.indexOf(Store.Autoloader) === -1) {
		const autoloaderStore = new AutoloaderStore(constructorOptions)
		if (after) {
			await after(autoloaderStore)
		}
		siblings.autoloader = autoloaderStore
	}
	if (!only || only.indexOf(Store.Onboarding) === -1) {
		const onboardingStore = new OnboardingStore(constructorOptions)
		if (after) {
			await after(onboardingStore)
		}
		siblings.onboarding = onboardingStore
	}
	if (!only || only.indexOf(Store.Remote) === -1) {
		const remoteStore = new RemoteStore(constructorOptions)
		if (after) {
			await after(remoteStore)
		}
		siblings.remote = remoteStore
	}
	if (!only || only.indexOf(Store.Schema) === -1) {
		const schemaStore = new SchemaStore(constructorOptions)
		if (after) {
			await after(schemaStore)
		}
		siblings.schema = schemaStore
	}
	if (!only || only.indexOf(Store.Skill) === -1) {
		const skillStore = new SkillStore(constructorOptions)
		if (after) {
			await after(skillStore)
		}
		siblings.skill = skillStore
	}
	if (!only || only.indexOf(Store.User) === -1) {
		const userStore = new UserStore(constructorOptions)
		if (after) {
			await after(userStore)
		}
		siblings.user = userStore
	}
	if (!only || only.indexOf(Store.Watcher) === -1) {
		const watcherStore = new WatcherStore(constructorOptions)
		if (after) {
			await after(watcherStore)
		}
		siblings.watcher = watcherStore
	}

	return siblings as K extends undefined ? IStores : Pick<IStores, K[number]>
}
