import BaseCommand from '../Base'
import { Command } from 'commander'

export default class OnboardingCommand extends BaseCommand {
	public attachCommands(program: Command) {
		program
			.command('onboarding')
			.option('-r, --reset', 'Start count over')
			.description('Start onboarding')
			.action(this.onboarding.bind(this))
	}

	public async onboarding(cmd: Command) {
		if (cmd.reset) {
			this.stores.onboarding.setRunCount(0)
		}

		const runCount = this.stores.onboarding.getRunCount()

		// enable onboarding and increment count
		this.stores.onboarding.setIsEnabled(true)
		this.stores.onboarding.incrementRunCount()

		this.clear()
		this.hero(runCount == 0 ? 'You made it!' : 'Onboarding')

		if (runCount === 0) {
			this.writeLn(
				`It's Sprucebot again. Happy you were able to get Spruce installed.`
			)
		}
		await this.wait()

		this.writeLn('')
	}
}
