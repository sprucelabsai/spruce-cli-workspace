import fs from 'fs'

export enum StoreScope {
	Global = 'global',
	Local = 'local'
}

export default abstract class StoreBase {
	/** the current scope */
	public scope = StoreScope.Global

	/** a name each store must set */
	abstract name: string

	public constructor() {
		// create save dir
		const { directory: globalDirectory } = this.getGlobalConfigPath()
		const { directory: localDirectory } = this.getLocalConfigPath()

		if (!fs.existsSync(globalDirectory)) {
			fs.mkdirSync(globalDirectory)
		}

		if (!fs.existsSync(localDirectory)) {
			fs.mkdirSync(localDirectory)
		}
	}
	/** write a value to disk (should only be used in save()) */
	protected writeValue(key: string, value: any) {
		this.writeValues({ [key]: value })
		return
	}

	/** write a whole object to disk (should only be used in save()) */
	protected writeValues<T extends Record<string, any>>(values: T) {
		const currentValues = this.readValues()
		const updatedValues = { ...currentValues, ...values }

		const { file } =
			this.scope === StoreScope.Local
				? this.getLocalConfigPath()
				: this.getGlobalConfigPath()

		const contents = JSON.stringify(updatedValues)
		fs.writeFileSync(file, contents)

		return this
	}

	/** read values from disk */
	protected readValues<T extends Record<string, any>>(): Partial<T> {
		const { file } =
			this.scope === StoreScope.Local
				? this.getLocalConfigPath()
				: this.getGlobalConfigPath()

		try {
			const contents = fs.readFileSync(file, 'utf8')
			const values = JSON.parse(contents) as T
			return values
		} catch (err) {
			console.log('could not read file')
		}
		// falls back to an empty object
		return {}
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
		const homedir = process.cwd()
		const configDirectory = `${homedir}/.spruce`
		const filePath = `${homedir}/.spruce/settings.json`

		return {
			directory: configDirectory,
			file: filePath
		}
	}
}
