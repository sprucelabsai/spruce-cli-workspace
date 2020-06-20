/* eslint-disable spruce/prefer-pascal-case-enums */
// Import necessary interface(s)
// Import each matching class that will be autoloaded
import OnboardingStore from '#spruce/../src/stores/OnboardingStore'
import RemoteStore from '#spruce/../src/stores/RemoteStore'
import SchemaStore from '#spruce/../src/stores/SchemaStore'
import SkillStore from '#spruce/../src/stores/SkillStore'
import UserStore from '#spruce/../src/stores/UserStore'
import WatcherStore from '#spruce/../src/stores/WatcherStore'

export type Stores =
	| OnboardingStore
	| RemoteStore
	| SchemaStore
	| SkillStore
	| UserStore
	| WatcherStore

export interface IStores {
	onboarding: OnboardingStore
	remote: RemoteStore
	schema: SchemaStore
	skill: SkillStore
	user: UserStore
	watcher: WatcherStore
}

export enum Store {
	Onboarding = 'onboarding',
	Remote = 'remote',
	Schema = 'schema',
	Skill = 'skill',
	User = 'user',
	Watcher = 'watcher'
}
