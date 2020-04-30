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
	[store: string]: Onboarding | Remote | Schema | Skill | User | Watcher
}

export enum Store {
	Onboarding = 'onboarding',
	Remote = 'remote',
	Schema = 'schema',
	Skill = 'skill',
	User = 'user',
	Watcher = 'watcher',
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

	const siblings: IStores = {
		onboarding,
		remote,
		schema,
		skill,
		user,
		watcher
	}

	// @ts-ignore method is optional
	if (typeof onboarding.afterAutoload === 'function') {
		// @ts-ignore method is optional
		onboarding.afterAutoload(siblings)
	}
	// @ts-ignore method is optional
	if (typeof remote.afterAutoload === 'function') {
		// @ts-ignore method is optional
		remote.afterAutoload(siblings)
	}
	// @ts-ignore method is optional
	if (typeof schema.afterAutoload === 'function') {
		// @ts-ignore method is optional
		schema.afterAutoload(siblings)
	}
	// @ts-ignore method is optional
	if (typeof skill.afterAutoload === 'function') {
		// @ts-ignore method is optional
		skill.afterAutoload(siblings)
	}
	// @ts-ignore method is optional
	if (typeof user.afterAutoload === 'function') {
		// @ts-ignore method is optional
		user.afterAutoload(siblings)
	}
	// @ts-ignore method is optional
	if (typeof watcher.afterAutoload === 'function') {
		// @ts-ignore method is optional
		watcher.afterAutoload(siblings)
	}

	return siblings
}
