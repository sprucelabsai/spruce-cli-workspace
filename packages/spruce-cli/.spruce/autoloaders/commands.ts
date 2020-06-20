/* eslint-disable spruce/prefer-pascal-case-enums */
// Import necessary interface(s)
import AbstractCommand from '#spruce/../src/commands/AbstractCommand'
// Import each matching class that will be autoloaded
import ErrorCommand from '#spruce/../src/commands/ErrorCommand'
import FeatureCommand from '#spruce/../src/commands/FeatureCommand'
import OnboardingCommand from '#spruce/../src/commands/OnboardingCommand'
import RemoteCommand from '#spruce/../src/commands/RemoteCommand'
import SchemaCommand from '#spruce/../src/commands/SchemaCommand'
import SkillCommand from '#spruce/../src/commands/SkillCommand'
import TestCommand from '#spruce/../src/commands/TestCommand'
import UserCommand from '#spruce/../src/commands/UserCommand'
import WatchCommand from '#spruce/../src/commands/WatchCommand'

export type Commands =
	| ErrorCommand
	| FeatureCommand
	| OnboardingCommand
	| RemoteCommand
	| SchemaCommand
	| SkillCommand
	| TestCommand
	| UserCommand
	| WatchCommand

export interface ICommands {
	error: ErrorCommand
	feature: FeatureCommand
	onboarding: OnboardingCommand
	remote: RemoteCommand
	schema: SchemaCommand
	skill: SkillCommand
	test: TestCommand
	user: UserCommand
	watch: WatchCommand
}

export enum Command {
	Error = 'error',
	Feature = 'feature',
	Onboarding = 'onboarding',
	Remote = 'remote',
	Schema = 'schema',
	Skill = 'skill',
	Test = 'test',
	User = 'user',
	Watch = 'watch'
}

export default async function autoloader<K extends Command[]>(options: {
	constructorOptions: any
	after?: (instance: AbstractCommand) => Promise<void>
	only?: K
}): Promise<K extends undefined ? ICommands : Pick<ICommands, K[number]>> {
	const { constructorOptions, after, only } = options
	const siblings: Partial<ICommands> = {}

	if (!only || only.indexOf(Command.Error) > -1) {
		const errorCommand = new ErrorCommand(constructorOptions)
		if (after) {
			await after(errorCommand)
		}
		siblings.error = errorCommand
	}
	if (!only || only.indexOf(Command.Feature) > -1) {
		const featureCommand = new FeatureCommand(constructorOptions)
		if (after) {
			await after(featureCommand)
		}
		siblings.feature = featureCommand
	}
	if (!only || only.indexOf(Command.Onboarding) > -1) {
		const onboardingCommand = new OnboardingCommand(constructorOptions)
		if (after) {
			await after(onboardingCommand)
		}
		siblings.onboarding = onboardingCommand
	}
	if (!only || only.indexOf(Command.Remote) > -1) {
		const remoteCommand = new RemoteCommand(constructorOptions)
		if (after) {
			await after(remoteCommand)
		}
		siblings.remote = remoteCommand
	}
	if (!only || only.indexOf(Command.Schema) > -1) {
		const schemaCommand = new SchemaCommand(constructorOptions)
		if (after) {
			await after(schemaCommand)
		}
		siblings.schema = schemaCommand
	}
	if (!only || only.indexOf(Command.Skill) > -1) {
		const skillCommand = new SkillCommand(constructorOptions)
		if (after) {
			await after(skillCommand)
		}
		siblings.skill = skillCommand
	}
	if (!only || only.indexOf(Command.Test) > -1) {
		const testCommand = new TestCommand(constructorOptions)
		if (after) {
			await after(testCommand)
		}
		siblings.test = testCommand
	}
	if (!only || only.indexOf(Command.User) > -1) {
		const userCommand = new UserCommand(constructorOptions)
		if (after) {
			await after(userCommand)
		}
		siblings.user = userCommand
	}
	if (!only || only.indexOf(Command.Watch) > -1) {
		const watchCommand = new WatchCommand(constructorOptions)
		if (after) {
			await after(watchCommand)
		}
		siblings.watch = watchCommand
	}

	return siblings as K extends undefined
		? ICommands
		: Pick<ICommands, K[number]>
}
