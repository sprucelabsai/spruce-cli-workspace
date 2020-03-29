import { Command } from 'commander'
import BaseCommand from '../Base'
import skillState from '../../stores/Skill'

export default class CreateSkill extends BaseCommand {
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
