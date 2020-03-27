import StoreBase from './Base'
import Schema, {
	FieldType,
	IFieldSelectDefinitionChoice
} from '@sprucelabs/schema'

export enum RemoteStoreRemoteType {
	Production = 'production',
	Alpha = 'alpha',
	Stage = 'stage',
	Dev = 'dev',
	Local = 'local'
}

export const RemoteStoreChoices = Object.keys(RemoteStoreRemoteType).map(
	remote => ({
		// @ts-ignore https://github.com/microsoft/TypeScript/issues/33123
		value: RemoteStoreRemoteType[remote],
		// @ts-ignore https://github.com/microsoft/TypeScript/issues/33123
		label: RemoteStoreRemoteType[remote]
	})
) as IFieldSelectDefinitionChoice[]

/** the structure of the data remote saves */
export interface IRemoteStoreValues {
	remote?: RemoteStoreRemoteType
}

export default class StoreRemote extends StoreBase {
	/** map of remote urls and subscriptions url */
	public static remotes = {
		[RemoteStoreRemoteType.Production]: {
			url: 'https://api.spruce.ai',
			graphqlSubscriptionsUrl: 'wss://api.spruce.ai/graphql'
		},
		[RemoteStoreRemoteType.Alpha]: {
			url: 'https://alpha-api.spruce.ai',
			graphqlSubscriptionsUrl: 'wss://alpha-api.spruce.ai/graphql'
		},
		[RemoteStoreRemoteType.Stage]: {
			url: 'https://stage-api.spruce.ai',
			graphqlSubscriptionsUrl: 'wss://stage-api.spruce.ai/graphql'
		},
		[RemoteStoreRemoteType.Dev]: {
			url: 'https://dev-api.spruce.ai',
			graphqlSubscriptionsUrl: 'wss://dev-api.spruce.ai/graphql'
		},
		[RemoteStoreRemoteType.Local]: {
			url: 'https://local-api.sprucebot.com',
			graphqlSubscriptionsUrl: 'wss://local-api.sprucebot.com/graphql'
		}
	}

	/** store name */
	public name = 'config'

	/** the schema that defines the config */
	public schema = new Schema({
		id: 'config-store',
		name: 'Config store',
		fields: {
			remote: {
				type: FieldType.Select,
				label: 'Remote',
				options: {
					choices: RemoteStoreChoices
				}
			}
		}
	})

	public constructor() {
		super()
		this.load()
	}

	/** set your remote (defaults to prod) */
	public setRemote(remote: RemoteStoreRemoteType) {
		this.schema.set('remote', remote)
		this.save()
		return this
	}

	/** get your selected remote */
	public getRemote(): RemoteStoreRemoteType {
		return (
			(this.schema.get('remote') as RemoteStoreRemoteType) ||
			RemoteStoreRemoteType.Production
		)
	}

	/** get a remote url */
	public getRemoteUrl(remote?: RemoteStoreRemoteType): string {
		const selectedRemote = remote || this.getRemote()
		const url = StoreRemote.remotes[selectedRemote].url
		return url
	}

	/** save changes to filesystem */
	public async save() {
		const values = this.schema.getValues()
		this.writeValues(values)
		return this
	}

	/** load everything into the store (called in constructor) */
	public async load() {
		const saved = this.readValues<IRemoteStoreValues>()
		this.schema.setValues(saved)
		return this
	}
}
