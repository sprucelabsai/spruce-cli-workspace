import AbstractCommand from '../AbstractCommand'
import { Command } from 'commander'
import { FieldType } from '@sprucelabs/schema'
import path from 'path'

export default class TestCommand extends AbstractCommand {
	public attachCommands(program: Command) {
		program
			.command('test:create')
			.description('Create a new test')
			.option('-t, --targetFileOrDir <target>')
			.action(this.create.bind(this))
	}

	public async create(cmd: Command) {
		let target = cmd.targetFileOrDir as string

		if (!target) {
			target = await this.prompt({
				type: FieldType.File,
				label: 'Which file would you like to test?',
				defaultValue: path.join(this.cwd, 'src')
			})
		}

		// Make sure test module is installed
		this.startLoading('Installing dependencies')
		await this.utilities.package.setupForTesting()
		this.stopLoading()

		const name = target
			.replace(path.dirname(target), '')
			.replace(path.extname(target), '')

		const pascalName = this.utilities.names.toPascal(name)
		const destination = path.join(path.dirname(target), pascalName) + '.test.ts'
		const contents = this.templates.test({ pascalName })

		this.writeFile(destination, contents)
		this.info(`Test created at ${destination}`)
		this.info('Updated package.json')
		this.hint('Try `y test` or `y test:watch`')
	}
}
