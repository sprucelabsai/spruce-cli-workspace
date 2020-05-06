import AbstractCommand from './AbstractCommand'
import { Command } from 'commander'
import log from '../lib/log'
import { FieldType } from '@sprucelabs/schema'

export default class FeatureCommand extends AbstractCommand {
	public attachCommands(program: Command) {
		program
			.command('feature:install')
			.description('Install a feature')
			.action(this.installFeature.bind(this))
	}

	public async installFeature() {
		log.debug('Install feature!')
		const choices = this.services.feature.getAvailableFeatures().map(f => ({
			value: f.feature,
			label: f.description
		}))

		const choice = await this.utilities.terminal.prompt({
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
