import fs from 'fs'
import { Mercury } from '@sprucelabs/mercury'
import log from '../lib/log'
import SpruceError from '../errors/SpruceError'
import { ErrorCode } from '#spruce/errors/codes.types'

/** Are we running globally or locally? */
export enum StoreScope {
	Global = 'global',
	Local = 'local'
}

/** Are we authed as a user or a skill? */
export enum StoreAuth {
	User = 'user',
	Skill = 'skill'
}

/** Options needed by the store on instantiation */
export interface IStoreOptions {
	mercury: Mercury
	cwd: string
	scope?: StoreScope
	authType?: StoreAuth
}

export interface IBaseStoreSettings {
	authType: StoreAuth
}

export default abstract class AbstractStore<
	Settings extends IBaseStoreSettings = IBaseStoreSettings
> {
	/** The current scope */
	public scope = StoreScope.Global

	/** How we're logged in, user or skill */
	public get authType() {
		return this.readValue('authType') ?? StoreAuth.User
	}

	public set authType(type: StoreAuth) {
		this.writeValue('authType', type)
	}

	/** For making calls to the world */
	public mercury: Mercury

	/** Current directory for all operations */
	public cwd: string

	/** A name each store must set */
	abstract name: string

	public constructor(options: IStoreOptions) {
		const { mercury, cwd, scope, authType } = options

		this.mercury = mercury
		this.cwd = cwd
		this.scope = scope ?? this.scope
		this.authType = authType ?? this.authType

		// Create save dir
		const { directory: globalDirectory } = this.getGlobalConfigPath()
		const { directory: localDirectory } = this.getLocalConfigPath()

		if (!fs.existsSync(globalDirectory)) {
			fs.mkdirSync(globalDirectory)
		}

		if (scope === StoreScope.Local && !fs.existsSync(localDirectory)) {
			fs.mkdirSync(localDirectory)
		}
	}
	/** Write a value to disk (should only be used in save()) */
	protected writeValue<F extends keyof Settings>(key: F, value: Settings[F]) {
		this.writeValues({ [key]: value })
		return
	}

	/** Write a whole object to disk (should only be used in save()) */
	protected writeValues<T extends Record<string, any>>(values: T) {
		const currentValues = this.readValues()
		const updatedValues = { ...currentValues, ...values }

		const { file, directory } =
			this.scope === StoreScope.Local
				? this.getLocalConfigPath()
				: this.getGlobalConfigPath()

		// Make sure dir exists
		if (!fs.existsSync(directory)) {
			fs.mkdirSync(directory)
		}

		const contents = JSON.stringify(updatedValues)
		fs.writeFileSync(file, contents)

		return this
	}

	/** Read a single value */
	protected readValue<F extends keyof Settings>(key: F) {
		const settings = this.readValues()
		return settings[key]
	}

	/** Read values from disk */
	protected readValues<T extends Settings>(): Partial<T> {
		const { file, directory } =
			this.scope === StoreScope.Local
				? this.getLocalConfigPath()
				: this.getGlobalConfigPath()

		try {
			// Make sure dir exists
			if (!fs.existsSync(directory)) {
				fs.mkdirSync(directory)
			}

			const contents = fs.readFileSync(file, 'utf8')
			const values = JSON.parse(contents) as T
			return values
		} catch (err) {
			log.debug(
				`AbstractStore.readValues failed to read settings file at ${file}`
			)
		}
		// Falls back to an empty object
		return {}
	}

	/** A copy of mercury authed against the token you sent */
	protected async mercuryForUser(token: string): Promise<Mercury> {
		const { connectionOptions } = this.mercury
		if (!connectionOptions) {
			throw new SpruceError({
				code: ErrorCode.GenericMercury,
				friendlyMessage:
					'user store was trying to auth on mercury but had no options (meaning it was never connected)'
			})
		}
		// Connect with new creds
		await this.mercury.connect({
			...(connectionOptions || {}),
			credentials: { token }
		})

		return this.mercury
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

	private getLocalConfigPath() {
		const homedir = this.cwd
		const configDirectory = `${homedir}/.spruce`
		const filePath = `${homedir}/.spruce/settings.json`

		return {
			directory: configDirectory,
			file: filePath
		}
	}
}
