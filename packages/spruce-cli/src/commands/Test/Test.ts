import AbstractCommand from '../Abstract'
import { Command } from 'commander'

export default class TestCommand extends AbstractCommand {
	public attachCommands(program: Command) {
		program
			.command('test:create')
			.description('Create a new test')
			.option('-f, --file <file>')
			.action(this.create.bind(this))
	}

	public create(cmd: Command) {
		debugger
	}
}
