import { Command } from 'commander'
import AbstractCommand from '../Abstract'
import { FieldType } from '@sprucelabs/schema'
import { RemoteStoreRemoteType, RemoteStoreChoices } from '../../stores'

export default class RemoteCommand extends AbstractCommand {
	/** Sets up commands */
	public attachCommands(program: Command) {
		program
			.command('remote:set [environment]')
			.description('Set the environment to use')
			.action(this.setEnvironment.bind(this))
	}

	public async setEnvironment(
		environmentParam?: RemoteStoreRemoteType | string
	) {
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

		this.stores.remote.setRemote(environment as RemoteStoreRemoteType).save()
	}
}
