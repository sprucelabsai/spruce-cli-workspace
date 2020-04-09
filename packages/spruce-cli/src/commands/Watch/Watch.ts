/* eslint-disable @typescript-eslint/no-var-requires */
import { Command } from 'commander'
import AbstractCommand from '../AbstractCommand'
import log from '../../lib/log'

export default class WatchCommand extends AbstractCommand {
	public attachCommands(program: Command): void {
		// TODO: add option to override globby
		// Or .autoloader
		program
			.command('watch')
			.description('Watch and regenerate types')
			.action(this.watch.bind(this))
	}

	private async watch() {
		log.debug(process.cwd())
	}
}
