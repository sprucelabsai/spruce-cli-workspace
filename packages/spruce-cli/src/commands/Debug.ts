import { Command } from 'commander'
import BaseCommand from './Base'

export default class Debug extends BaseCommand {
	/** Sets up commands */
	public attachCommands(program: Command) {
		program
			.command('debug')
			.description('Debug method for testing during CLI development')
			.action(this.debug.bind(this))
	}

	public async debug(): Promise<void> {
		// log.debug({ debug: 'test' })
		// log.info('Testing info log')
		// log.warn('Testing warn log')
		// log.crit('Testing crit log')
		// log.fatal('Testing fatal log')

		this.info(process.cwd())
	}
}
