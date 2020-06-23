import { Mercury } from '@sprucelabs/mercury'
import log from '../singletons/log'
import { AuthedAs } from '../types/cli.types'
import diskUtil from '../utilities/disk.utility'
import AbstractStore from './AbstractStore'

export interface ILocalStoreSettings {
	authType: AuthedAs
}

export default abstract class AbstractLocalStore<
	Settings extends ILocalStoreSettings = ILocalStoreSettings
> extends AbstractStore {
	public cwd: string
	public constructor(cwd: string, mercury: Mercury) {
		super(mercury)
		this.cwd = cwd
		const { directory: localDirectory } = this.getConfigPath()

		if (!diskUtil.doesDirExist(localDirectory)) {
			diskUtil.createDir(localDirectory)
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
		const { file, directory } = this.getConfigPath()

		if (!diskUtil.doesDirExist(directory)) {
			diskUtil.createDir(directory)
		}

		const contents = JSON.stringify(updatedValues)
		diskUtil.writeFile(file, contents)

		return this
	}

	protected getConfigPath() {
		const homedir = this.cwd
		const configDirectory = `${homedir}/.spruce`
		const filePath = `${homedir}/.spruce/settings.json`

		return {
			directory: configDirectory,
			file: filePath
		}
	}

	/** Read a single value */
	protected readValue<F extends keyof Settings>(key: F) {
		const settings = this.readValues()
		return settings[key]
	}

	/** Read values from disk */
	protected readValues<T extends Settings>(): Partial<T> {
		const { file, directory } = this.getConfigPath()

		try {
			// Make sure dir exists
			if (!diskUtil.doesDirExist(directory)) {
				diskUtil.createDir(directory)
			}

			const contents = diskUtil.readFile(file)
			const values = JSON.parse(contents) as T
			return values
		} catch (err) {
			log.info(`No skill detected`)
		}
		// Falls back to an empty object
		return {}
	}
}
