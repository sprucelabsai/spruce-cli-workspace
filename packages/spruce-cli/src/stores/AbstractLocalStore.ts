import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import log from '../singletons/log'
import { AuthedAs } from '../types/cli.types'
import AbstractStore from './AbstractStore'
import { IStoreOptions } from './AbstractStore'

export interface ILocalStoreSettings {
	authType: AuthedAs
}

export default abstract class AbstractLocalStore<
	Settings extends ILocalStoreSettings
> extends AbstractStore {
	public constructor(options: IStoreOptions) {
		super(options)

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
		const configDirectory = diskUtil.resolveHashSprucePath(this.cwd)
		const filePath = diskUtil.resolveHashSprucePath(this.cwd, 'settings.json')

		return {
			directory: configDirectory,
			file: filePath,
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
