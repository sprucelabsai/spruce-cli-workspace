import logger from '@sprucelabs/log'
import fs from 'fs'
import _ from 'lodash'
import { terminal } from './Terminal'

// @ts-ignore
const log = logger.log

export enum RemoteType {
	Production = 'production',
	Alpha = 'alpha',
	Stage = 'stage',
	Dev = 'dev',
	Local = 'local'
}

export type TRemoteConfig = {
	[key: string]: {
		remote: string
		graphqlSubscriptionsUrl: string
	}
}

export const RemoteConfig: TRemoteConfig = {
	[RemoteType.Production]: {
		remote: 'https://api.spruce.ai',
		graphqlSubscriptionsUrl: 'wss://api.spruce.ai/graphql'
	},
	[RemoteType.Alpha]: {
		remote: 'https://alpha-api.spruce.ai',
		graphqlSubscriptionsUrl: 'wss://alpha-api.spruce.ai/graphql'
	},
	[RemoteType.Stage]: {
		remote: 'https://stage-api.spruce.ai',
		graphqlSubscriptionsUrl: 'wss://stage-api.spruce.ai/graphql'
	},
	[RemoteType.Dev]: {
		remote: 'https://dev-api.spruce.ai',
		graphqlSubscriptionsUrl: 'wss://dev-api.spruce.ai/graphql'
	},
	[RemoteType.Local]: {
		// remote: 'http://localhost:3005',
		remote: 'https://local-api.sprucebot.com',
		// graphqlSubscriptionsUrl: 'ws://localhost:3005/graphql'
		graphqlSubscriptionsUrl: 'wss://local-api.sprucebot.com/graphql'
	}
}

export enum ConfigScope {
	Global = 'global',
	Directory = 'directory'
}

class Config {
	/** The remote api url. https://api.spruce.ai/ by default */
	get remote(): RemoteType {
		return this.get('remote')
	}

	/** The api graphql subscriptions urls. wss://api.spruce.ai/graphql by default */
	get graphqlSubscriptionsUrl(): string {
		return this.get('graphqlSubscriptionsUrl')
	}

	private readonly defaultGlobalConfig = { remote: RemoteType.Production }
	private readonly defaultDirectoryConfig = {}
	private isInitialized = false

	private globalConfig: Record<string, any> = {}
	private directoryConfig: Record<string, any> = {}

	public init() {
		this.createSaveLocation()
		this.globalConfig = this.getSavedGlobalConfig()
		this.directoryConfig = this.getSavedDirectoryConfig()
		this.isInitialized = true
	}

	public getApiUrl(remote: RemoteType): string {
		if (!this.isInitialized) {
			this.init()
		}
		if (RemoteConfig[remote]) {
			return RemoteConfig[remote].remote
		}
		terminal.warn(
			`No remote configuration found for ${remote}. Defaulting to production.`
		)
		return RemoteConfig[RemoteType.Production].remote
	}

	/** Save a config item */
	public save(
		options: { [key: string]: any },
		configScope = ConfigScope.Global
	) {
		if (!this.isInitialized) {
			this.init()
		}
		switch (configScope) {
			case ConfigScope.Directory:
				this.directoryConfig = _.merge(this.directoryConfig, options)
				break
			case ConfigScope.Global:
			default:
				this.globalConfig = _.merge(this.globalConfig, options)
				break
		}

		this.writeConfig(configScope)
	}

	/** Get a config item by key */
	public get(key: string, configScope = ConfigScope.Global) {
		if (!this.isInitialized) {
			this.init()
		}
		switch (configScope) {
			case ConfigScope.Directory:
				return this.directoryConfig[key]
			case ConfigScope.Global:
			default:
				return this.globalConfig[key]
		}
	}

	/** Set the API url to use */
	public async setRemote(remote: RemoteType | string) {
		if (!this.isInitialized) {
			this.init()
		}
		if (RemoteConfig[remote]) {
			// this.save(RemoteConfig[remote])
			this.save({
				remote
			})
		}

		// Refresh the event contracts from that envrionment
		// const response = await request.get(`${this.remote}/api/2.0/types/events`)
		// const response = await request.get(`${this.remote}/api/1.0/config`)
		// console.log({ response })

		// if (response && response.text) {
		// 	await this.writeFileSync(
		// 		`${__dirname}/server/interfaces/events-generated.ts`,
		// 		response.text
		// 	)
		// }

		terminal.info(`Remote URL set to: ${remote}`)
	}

	private createSaveLocation() {
		const { directory } = this.getGlobalConfigPath()

		if (!fs.existsSync(directory)) {
			fs.mkdirSync(directory)
		}
	}

	private getSavedGlobalConfig() {
		const { file } = this.getGlobalConfigPath()
		try {
			const data = fs.readFileSync(file, 'utf8')
			const config = JSON.parse(data)
			return config
		} catch (e) {
			log.debug(e)
		}

		return this.defaultGlobalConfig
	}

	private getSavedDirectoryConfig() {
		const { file } = this.getDirectoryConfigPath()
		try {
			const data = fs.readFileSync(file, 'utf8')
			const config = JSON.parse(data)
			return config
		} catch (e) {
			log.debug(e)
		}

		return this.defaultDirectoryConfig
	}

	private writeConfig(configScope: ConfigScope) {
		switch (configScope) {
			case ConfigScope.Directory:
				{
					const { file, directory } = this.getDirectoryConfigPath()
					if (!fs.existsSync(directory)) {
						fs.mkdirSync(directory)
					}
					fs.writeFileSync(file, JSON.stringify(this.directoryConfig))
				}
				break
			case ConfigScope.Global:
			default:
				{
					const { file } = this.getGlobalConfigPath()
					fs.writeFileSync(file, JSON.stringify(this.globalConfig))
				}
				break
		}
	}

	private getGlobalConfigPath() {
		const homedir = require('os').homedir()
		const configDirectory = `${homedir}/.spruce`
		const filePath = `${homedir}/.spruce/cli.json`

		return {
			directory: configDirectory,
			file: filePath
		}
	}

	private getDirectoryConfigPath() {
		const homedir = process.cwd()
		const configDirectory = `${homedir}/.spruce`
		const filePath = `${homedir}/.spruce/settings.json`

		return {
			directory: configDirectory,
			file: filePath
		}
	}
}

const config = new Config()
export default config
