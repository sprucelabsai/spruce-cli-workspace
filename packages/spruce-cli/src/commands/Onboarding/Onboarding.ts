import BaseCommand from '../Base'
import { Command } from 'commander'

export default class OnboardingCommand extends BaseCommand {
	public attachCommands(program: Command) {
		program
			.command('onboarding')
			.description('Start onboarding')
			.action(this.onboarding.bind(this))
	}

	public async onboarding() {
		this.headline('Hey there!')
	}
}
