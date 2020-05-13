import AbstractCommand, {
	ICommandOptions
} from '../../src/commands/AbstractCommand'
import commandsAutoloader, { ICommands } from './commands'

export interface IAutoloaderOptions {
	commands: {
		constructorOptions: ICommandOptions
		after?: (instance: AbstractCommand) => Promise<void>
	}
}

export default async function autoloader(
	options: IAutoloaderOptions
): Promise<{
	commands: ICommands
}> {
	const commands = await commandsAutoloader({
		constructorOptions: options.commands.constructorOptions,
		after: options.commands.after
	})

	return {
		commands
	}
}
