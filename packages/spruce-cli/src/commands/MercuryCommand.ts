import { Command } from 'commander'
import log from '../lib/log'
import AbstractCommand from './AbstractCommand'

export default class MercuryCommand extends AbstractCommand {
	public attachCommands(program: Command) {
		program
			.command('mercury:emit')
			.description('Emit an event using Mercury')
			.action(this.emit.bind(this))
	}

	public async emit() {
		// TODO
		log.debug('Emit an event')
	}
}
