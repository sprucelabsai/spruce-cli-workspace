import path from 'path'
import { Command } from 'commander'
import { Feature } from '#spruce/autoloaders/features'
import FieldType from '#spruce/schemas/fields/fieldType'
import AbstractCommand from './AbstractCommand'

export default class TestCommand extends AbstractCommand {
	public attachCommands = (program: Command) => {
		program
			.command('test.create [target]')
			.description('Create a test for a specific file')
			.action(this.create)
	}

	public create = async (targetOption: string | undefined) => {
		let target = targetOption

		await this.services.feature.install({
			features: [
				{
					feature: Feature.Test
				}
			]
		})

		if (!target) {
			const file = await this.term.prompt({
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

		const name = this.utilities.names.toFileNameWithoutExtension(target)
		const namePascal = this.utilities.names.toPascal(name)
		const destination = path.join(path.dirname(target), namePascal) + '.test.ts'
		const contents = this.templates.test({ namePascal })

		this.writeFile(destination, contents)

		this.term.info(`Test file created at: ${destination}`)
		this.term.hint('Try `yarn test` or `yarn test:watch`')
	}
}
