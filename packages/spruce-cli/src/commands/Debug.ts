import { Command } from 'commander'
import AbstractCommand from './AbstractCommand'

export class Debug extends AbstractCommand {
	/** Sets up commands */
	public attachCommands(program: Command) {
		program
			.command('debug')
			.description('Debug method for testing during CLI development')
			.action(this.debug.bind(this))
	}

	public async debug(): Promise<void> {
		// Log.debug({ debug: 'test' })
		// log.info('Testing info log')
		// log.warn('Testing warn log')
		// log.crit('Testing crit log')
		// log.fatal('Testing fatal log')

		this.utilities.terminal.info(process.cwd())
	}
}

export default Debug
