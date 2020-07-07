import Schema, { ISelectFieldDefinitionChoice } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import { AuthedAs } from '../types/cli.types'
import AbstractLocalStore, { ILocalStoreSettings } from './AbstractLocalStore'

export enum RemoteStoreRemoteType {
	Production = 'production',
	Alpha = 'alpha',
	Stage = 'stage',
	Dev = 'dev',
	Local = 'local',
}

export const RemoteStoreChoices = Object.keys(RemoteStoreRemoteType).map(
	(remote) => ({
		// @ts-ignore https://github.com/microsoft/TypeScript/issues/33123
		value: RemoteStoreRemoteType[remote],
		// @ts-ignore https://github.com/microsoft/TypeScript/issues/33123
		label: RemoteStoreRemoteType[remote],
	})
) as ISelectFieldDefinitionChoice[]

/** The structure of the data remote saves */
export interface IRemoteStoreSettings extends ILocalStoreSettings {
	remote?: RemoteStoreRemoteType
}

export default class RemoteStore extends AbstractLocalStore<
	IRemoteStoreSettings
> {
	/** Map of remote urls and subscriptions url */
	public static remotes = {
		[RemoteStoreRemoteType.Production]: {
			url: 'https://api.spruce.ai',
			graphqlSubscriptionsUrl: 'wss://api.spruce.ai/graphql',
		},
		[RemoteStoreRemoteType.Alpha]: {
			url: 'https://alpha-api.spruce.ai',
			graphqlSubscriptionsUrl: 'wss://alpha-api.spruce.ai/graphql',
		},
		[RemoteStoreRemoteType.Stage]: {
			url: 'https://stage-api.spruce.ai',
			graphqlSubscriptionsUrl: 'wss://stage-api.spruce.ai/graphql',
		},
		[RemoteStoreRemoteType.Dev]: {
			url: 'https://dev-api.spruce.ai',
			graphqlSubscriptionsUrl: 'wss://dev-api.spruce.ai/graphql',
		},
		[RemoteStoreRemoteType.Local]: {
			url: 'https://local-api.sprucebot.com',
			graphqlSubscriptionsUrl: 'wss://local-api.sprucebot.com/graphql',
		},
	}

	/** Store name */
	public name = 'config'

	/** The schema that defines the config */
	public schema = new Schema({
		id: 'config-store',
		name: 'Config store',
		fields: {
			remote: {
				type: FieldType.Select,
				label: 'Remote',
				options: {
					choices: RemoteStoreChoices,
				},
			},
		},
	})

	/** Set your remote (defaults to prod) */
	public setRemote(remote: RemoteStoreRemoteType) {
		this.schema.set('remote', remote)
		this.save()
		return this
	}

	/** Get your selected remote */
	public getRemote(): RemoteStoreRemoteType {
		return (
			(this.schema.get('remote') as RemoteStoreRemoteType) ||
			RemoteStoreRemoteType.Production
		)
	}

	/** Get a remote url */
	public getRemoteUrl(remote?: RemoteStoreRemoteType): string {
		const selectedRemote = remote || this.getRemote()
		const url = RemoteStore.remotes[selectedRemote].url
		return url
	}

	/** Save changes to filesystem */
	public async save() {
		const values = this.schema.getValues()
		this.writeValues(values)
		return this
	}

	/** Load everything into the store (called in constructor) */
	public async load() {
		const saved = this.readValues()
		this.schema.setValues(saved)
		return this
	}

	public get authType() {
		return this.readValue('authType') ?? AuthedAs.User
	}

	public set authType(type: AuthedAs) {
		this.writeValue('authType', type)
	}
}
