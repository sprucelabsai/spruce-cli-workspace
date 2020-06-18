import { Command } from 'commander'
import FieldType from '#spruce/schemas/fields/fieldType'
import AbstractCommand from './AbstractCommand'

export default class FeatureCommand extends AbstractCommand {
	public attachCommands(program: Command) {
		program
			.command('feature.install')
			.description('Install a feature')
			.action(this.installFeature)
	}

	public installFeature = async () => {
		const choices = this.services.feature.getAvailableFeatures().map(f => ({
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
		await this.services.feature.install({
			features: [
				{
					feature: choice
				}
			]
		})
	}
}
