// Import base class
import AbstractCommand from '../../src/commands/AbstractCommand'

// Import each matching class that will be autoloaded
import Autoloader from '../../src/commands/AutoloaderCommand'
import Error from '../../src/commands/ErrorCommand'
import Onboarding from '../../src/commands/OnboardingCommand'
import Remote from '../../src/commands/RemoteCommand'
import Schema from '../../src/commands/SchemaCommand'
import Skill from '../../src/commands/SkillCommand'
import Test from '../../src/commands/TestCommand'
import User from '../../src/commands/UserCommand'
import Watch from '../../src/commands/WatchCommand'

// Import necessary interface(s)
import { ICommandOptions } from '../../src/commands/AbstractCommand'

export interface ICommands {
	autoloader: Autoloader
	error: Error
	onboarding: Onboarding
	remote: Remote
	schema: Schema
	skill: Skill
	test: Test
	user: User
	watch: Watch
}

export enum Command {
	Autoloader = 'autoloader',
	Error = 'error',
	Onboarding = 'onboarding',
	Remote = 'remote',
	Schema = 'schema',
	Skill = 'skill',
	Test = 'test',
	User = 'user',
	Watch = 'watch',
}

export default async function autoloader(options: {
	constructorOptions: ICommandOptions
	after?: (instance: AbstractCommand) => Promise<void>
}): Promise<ICommands> {
	const { constructorOptions, after } = options

	const autoloader = new Autoloader(constructorOptions)
	if (after) {
		await after(autoloader)
	}
	const error = new Error(constructorOptions)
	if (after) {
		await after(error)
	}
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
	const test = new Test(constructorOptions)
	if (after) {
		await after(test)
	}
	const user = new User(constructorOptions)
	if (after) {
		await after(user)
	}
	const watch = new Watch(constructorOptions)
	if (after) {
		await after(watch)
	}

	const siblings: ICommands = {
		autoloader,
		error,
		onboarding,
		remote,
		schema,
		skill,
		test,
		user,
		watch
	}

	// @ts-ignore method is optional
	if (typeof autoloader.afterAutoload === 'function') {
		// @ts-ignore method is optional
		autoloader.afterAutoload(siblings)
	}
	// @ts-ignore method is optional
	if (typeof error.afterAutoload === 'function') {
		// @ts-ignore method is optional
		error.afterAutoload(siblings)
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
	if (typeof test.afterAutoload === 'function') {
		// @ts-ignore method is optional
		test.afterAutoload(siblings)
	}
	// @ts-ignore method is optional
	if (typeof user.afterAutoload === 'function') {
		// @ts-ignore method is optional
		user.afterAutoload(siblings)
	}
	// @ts-ignore method is optional
	if (typeof watch.afterAutoload === 'function') {
		// @ts-ignore method is optional
		watch.afterAutoload(siblings)
	}

	return siblings
}
