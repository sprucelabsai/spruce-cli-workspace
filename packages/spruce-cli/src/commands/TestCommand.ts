import AbstractCommand from './AbstractCommand'
import { Command } from 'commander'
import { FieldType } from '@sprucelabs/schema'
import path from 'path'

export default class TestCommand extends AbstractCommand {
	public attachCommands(program: Command) {
		program
			.command('test:create')
			.description('Create a new test')
			.option('-t, --targetFile <target>')
			.action(this.create.bind(this))
	}

	public async create(cmd: Command) {
		let target = cmd.targetFile as string

		if (!target) {
			const file = await this.prompt({
				type: FieldType.File,
				label: 'Which file would you like to test?',
				isRequired: true,
				defaultValue: {
					path: path.join(this.cwd, 'src'),
					acceptableTypes: ['']
				}
			})
			// Get the path to the file off the file
			target = path.join(file.path ?? this.cwd, file.name)
		}

		// Make sure test module is installed
		this.startLoading('Installing dependencies')
		await this.utilities.tsConfig.setupForSchemas()
		this.stopLoading()

		const name = this.utilities.names.toFileNameWithoutExtension(target)

		const pascalName = this.utilities.names.toPascal(name)
		const destination = path.join(path.dirname(target), pascalName) + '.test.ts'
		const contents = this.templates.test({ pascalName })

		this.writeFile(destination, contents)
		this.info(`Test created at ${destination}`)
		this.info('Updated package.json')
		this.hint('Try `yarn test` or `yarn test:watch`')
	}
}
