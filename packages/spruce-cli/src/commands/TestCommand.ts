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
			.action(async (cmd: Command) => {
				await this.commands.skill.setup({
					...cmd,
					silent: true
				})
				await this.create(cmd)
			})
	}

	public async create(cmd: Command) {
		log.trace('test:create begin')
		const target = cmd.targetFile as string

		// if (!target) {
		// 	const file = await this.utilities.terminal.prompt({
		// 		type: FieldType.File,
		// 		label: 'Which file would you like to test?',
		// 		isRequired: true,
		// 		defaultValue: {
		// 			path: path.join(this.cwd, 'src'),
		// 			acceptableTypes: ['']
		// 		}
		// 	})
		// 	// Get the path to the file off the file
		// 	target = path.join(file.path ?? this.cwd, file.name)
		// }

		// Make sure test module is installed
		await this.services.feature.install({
			features: [
				{
					feature: Feature.Test,
					options: {
						target
					}
				}
			],
			command: this
		})

		// const name = this.utilities.names.toFileNameWithoutExtension(target)

		// const pascalName = this.utilities.names.toPascal(name)
		// const destination = path.join(path.dirname(target), name) + '.test.ts'
		// const contents = this.templates.test({ pascalName })

		// this.writeFile(destination, contents)
		// this.utilities.terminal.info(`Test created at ${destination}`)
		// this.utilities.terminal.info('Updated package.json')
		this.utilities.terminal.hint('Try `yarn test` or `yarn test:watch`')
	}
}
