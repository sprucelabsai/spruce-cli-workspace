import { Command } from 'commander'
import CommandBase from '../Base'
import { RemoteType } from '../../utilities/Config'
import { FieldType } from '@sprucelabs/schema'
import { RemoteStoreRemoteType, RemoteStoreChoices } from '../../stores'

export default class Remote extends CommandBase {
	/** Sets up commands */
	public attachCommands(program: Command) {
		program
			.command('remote:set [environment]')
			.description('Set the environment to use')
			.action(this.setEnvironment.bind(this))
	}

	public async setEnvironment(environmentParam?: RemoteType | string) {
		let environment = environmentParam

		if (!environment) {
			environment = await this.prompt({
				type: FieldType.Select,
				isRequired: true,
				label: 'Select a remote',
				options: {
					choices: RemoteStoreChoices
				}
			})
		}

		this.store.remote.setRemote(environment as RemoteStoreRemoteType).save()
	}
}
