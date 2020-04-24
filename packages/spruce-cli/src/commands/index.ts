// Import base class
import AbstractCommand from './AbstractCommand'

// Import each matching class that will be autoloaded
import Autoloader from './AutoloaderCommand'
import Error from './ErrorCommand'
import Onboarding from './OnboardingCommand'
import Remote from './RemoteCommand'
import Schema from './SchemaCommand'
import Skill from './SkillCommand'
import Test from './TestCommand'
import User from './UserCommand'

// Import necessary interface(s)
import { ICommandOptions } from './AbstractCommand'

export default async function autoloader(options: {
	constructorOptions: ICommandOptions
	after: (instance: AbstractCommand) => Promise<void>
}) {
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

	return {
		autoloader,
		error,
		onboarding,
		remote,
		schema,
		skill,
		test,
		user
	}
}
