import { Command } from 'commander'
import _ from 'lodash'
import CommandBase from '../../CommandBase'
import config, { RemoteType } from '../../utilities/Config'
import { IFieldSelectChoice, FieldType } from '@sprucelabs/spruce-types'

export default class Remote extends CommandBase {
	/** Sets up commands */
	public attachCommands(program: Command) {
		program
			.command('remote:set [environment]')
			.description('Set the environment to use')
			.action(this.setEnvironment)
	}

	public setEnvironment = async (environmentParam?: RemoteType | string) => {
		let environment = environmentParam

		if (environment && !(environment in RemoteType)) {
			this.warn('Invalid remote')
			environment = undefined
		}

		if (!environment) {
			const choices: IFieldSelectChoice[] = Object.keys(RemoteType).map(k => {
				const value = k
				return { label: k.toLowerCase(), value }
			})

			choices.push('yay')

			environment = await this.prompt({
				type: FieldType.Select,
				isRequired: true,
				label: 'Select a remote',
				options: {
					choices
				}
			})
		}

		config.setRemote(environment)
	}
}
