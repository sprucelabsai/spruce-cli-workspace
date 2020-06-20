import { Command } from 'commander'
import FieldType from '#spruce/schemas/fields/fieldType'
import FeatureManager from '../FeatureManager'
import AbstractCommand, { ICommandOptions } from './AbstractCommand'
interface IFeatureCommandOptions extends ICommandOptions {
	featureManager: FeatureManager
}

export default class FeatureCommand extends AbstractCommand {
	private featureManager: FeatureManager
	public constructor(options: IFeatureCommandOptions) {
		super(options)
		this.featureManager = options.featureManager
	}
	public attachCommands(program: Command) {
		program
			.command('feature.install')
			.description('Install a feature')
			.action(this.installFeature)
	}

	public installFeature = async () => {
		const choices = this.featureManager.getAvailableFeatures().map(f => ({
			value: f.feature,
			label: f.description
		}))

		const choice = await this.term.prompt({
			type: FieldType.Select,
			label: 'Which feature should be installed?',
			isRequired: true,
			options: {
				choices
			}
		})

		// Make sure test module is installed
		await this.featureManager.install({
			features: [
				{
					feature: choice
				}
			]
		})
	}
}
