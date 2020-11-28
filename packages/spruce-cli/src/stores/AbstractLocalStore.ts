import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { AuthedAs } from '../types/cli.types'
import AbstractStore from './AbstractStore'
import { StoreOptions } from './AbstractStore'

export interface LocalStoreSettings {
	authType: AuthedAs
}

export default abstract class AbstractLocalStore<
	Settings extends LocalStoreSettings
> extends AbstractStore {
	public constructor(options: StoreOptions) {
		super(options)
	}

	protected writeValue<F extends keyof Settings>(key: F, value: Settings[F]) {
		this.writeValues({ [key]: value })
		return
	}

	protected writeValues<T extends Record<string, any>>(values: T) {
		const currentValues = this.readConfig()
		const updatedValues = {
			...currentValues,
			[this.name]: { ...currentValues[this.name], ...values },
		}
		const { file, directory } = this.getConfigPath()

		if (!diskUtil.doesDirExist(directory)) {
			diskUtil.createDir(directory)
		}

		const contents = JSON.stringify(updatedValues, null, 2)
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

	protected readValue<F extends keyof Settings>(key: F) {
		const settings = this.readValues()
		return settings[key]
	}

	protected readValues<T extends Settings>(): Partial<T> {
		const values = this.readConfig()
		return (values[this.name] ?? {}) as T
	}

	private readConfig() {
		const { file, directory } = this.getConfigPath()

		if (!diskUtil.doesDirExist(directory)) {
			diskUtil.createDir(directory)
		}

		try {
			const contents = diskUtil.readFile(file)
			const values = JSON.parse(contents)

			return values
		} catch {
			return {}
		}
	}
}
