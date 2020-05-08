import AbstractCommand from './AbstractCommand'
import { Command } from 'commander'
import { Feature } from '#spruce/autoloaders/features'
import log from '../lib/log'

export default class TestCommand extends AbstractCommand {
	public attachCommands(program: Command) {
		program
			.command('test:create')
			.description('Create a new test')
			.option('-t, --targetFile <target>')
			.action(this.create.bind(this))
	}

	public async create(cmd: Command) {
		log.trace('test:create begin')
		const target = cmd.targetFile as string

		// Make sure test module is installed
		await this.services.feature.install({
			features: [
				{
					feature: Feature.Test,
					options: {
						target
					}
				}
			]
		})

		this.utilities.terminal.hint('Try `yarn test` or `yarn test:watch`')
	}
}
