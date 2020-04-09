// Import base class
import AbstractCommand from '../../src/commands/AbstractCommand'

// Import each matching class that will be autoloaded
import Autoloader from '../../src/commands/Autoloader/AutoloaderCommand'
import Error from '../../src/commands/Error/ErrorCommand'
import Onboarding from '../../src/commands/Onboarding/OnboardingCommand'
import Remote from '../../src/commands/Remote/RemoteCommand'
import Schema from '../../src/commands/Schema/SchemaCommand'
import Skill from '../../src/commands/Skill/SkillCommand'
import Test from '../../src/commands/Test/TestCommand'
import User from '../../src/commands/User/UserCommand'

// Import necessary interface(s)
import { ICommandOptions } from '../../src/commands/AbstractCommand'

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
