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

	public async create(cmd: Command) {
		// Make sure schema module is installed
		await this.services.yarn.install('@sprucelabs/test')
		debugger
	}
}
