import path from 'path'
import { Command } from 'commander'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import FeatureInstaller from '../features/FeatureInstaller'
import namesUtil from '../utilities/names.utility'
import AbstractCommand, { ICommandOptions } from './AbstractCommand'

interface ITestCommandOptions extends ICommandOptions {
	featureManager: FeatureInstaller
}

export default class TestCommand extends AbstractCommand {
	private featureManager: FeatureInstaller

	public constructor(options: ITestCommandOptions) {
		super(options)
		this.featureManager = options.featureManager
	}

	public attachCommands = (program: Command) => {
		program
			.command('test.create [target]')
			.description('Create a test for a specific file')
			.action(this.create)
	}

	public create = async (targetOption: string | undefined) => {
		let target = targetOption

		await this.featureManager.install({
			features: [
				{
					code: 'test',
					options: undefined,
				},
			],
		})

		if (!target) {
			const file = await this.term.prompt({
				type: FieldType.File,
				label: 'Which file would you like to test?',
				isRequired: true,
				defaultValue: {
					path: path.join(this.cwd, 'src'),
					acceptableTypes: [''],
				},
			})
			// Get the path to the file off the file
			target = path.join(file.path ?? this.cwd, file.name)
		}

		const name = namesUtil.toFileNameWithoutExtension(target)
		const namePascal = namesUtil.toPascal(name)
		const destination = path.join(path.dirname(target), namePascal) + '.test.ts'
		throw new Error(destination)
		// const contents = this.templates.test({ namePascal })

		// diskUtil.writeFile(destination, contents)

		// this.term.info(`Test file created at: ${destination}`)
		// this.term.hint('Try `yarn test` or `yarn test:watch`')
	}
}
