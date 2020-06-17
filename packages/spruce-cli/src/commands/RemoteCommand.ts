import { Command } from 'commander'
import FieldType from '#spruce/schemas/fields/fieldType'
import {
	RemoteStoreRemoteType,
	RemoteStoreChoices
} from '../stores/RemoteStore'
import AbstractCommand from './AbstractCommand'

export default class RemoteCommand extends AbstractCommand {
	/** Sets up commands */
	public attachCommands(program: Command) {
		program
			.command('remote:set [environment]')
			.description('Set the environment to use')
			.action(this.setEnvironment)
	}

	public setEnvironment = async (
		environmentParam?: RemoteStoreRemoteType | string
	) => {
		let environment = environmentParam

		if (!environment) {
			environment = await this.term.prompt({
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
