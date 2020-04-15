// Import base class
import AbstractStore from '../../src/stores/AbstractStore'

// Import each matching class that will be autoloaded
import Onboarding from '../../src/stores/OnboardingStore'
import Remote from '../../src/stores/RemoteStore'
import Schema from '../../src/stores/SchemaStore'
import Skill from '../../src/stores/SkillStore'
import User from '../../src/stores/UserStore'
import Watcher from '../../src/stores/WatcherStore'

// Import necessary interface(s)
import { IStoreOptions } from '../../src/stores/AbstractStore'

export interface IStores {
	onboarding: Onboarding
	remote: Remote
	schema: Schema
	skill: Skill
	user: User
	watcher: Watcher
}

export default async function autoloader(options: {
	constructorOptions: IStoreOptions
	after?: (instance: AbstractStore) => Promise<void>
}): Promise<IStores> {
	const { constructorOptions, after } = options

	const onboarding = new Onboarding(constructorOptions)
	if (after) {
		await after(onboarding)
	}
	const remote = new Remote(constructorOptions)
	if (after) {
		await after(remote)
	}
	const schema = new Schema(constructorOptions)
	if (after) {
		await after(schema)
	}
	const skill = new Skill(constructorOptions)
	if (after) {
		await after(skill)
	}
	const user = new User(constructorOptions)
	if (after) {
		await after(user)
	}
	const watcher = new Watcher(constructorOptions)
	if (after) {
		await after(watcher)
	}

	return {
		onboarding,
		remote,
		schema,
		skill,
		user,
		watcher
	}
}
