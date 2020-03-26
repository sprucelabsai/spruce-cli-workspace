import { Command } from 'commander'
import CommandBase from '../Base'
import skillState from '../../store/Skill'

export default class CreateSkill extends CommandBase {
	/** Sets up commands */
	public attachCommands(program: Command) {
		program
			.command('skill:info [type]')
			.description('Gets info about the current skill')
			.action(this.getInfo.bind(this))
	}

	public async getInfo() {
		skillState.printInfo()
	}
}
