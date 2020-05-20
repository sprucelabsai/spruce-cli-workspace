import Schema from '@sprucelabs/schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import AbstractStore, { IBaseStoreSettings, StoreScope } from './AbstractStore'

type Autoloader = SpruceSchemas.Local.IAutoloader

interface IAutoloaderStoreSettings extends IBaseStoreSettings {
	autoloaders: Autoloader[]
}

export default class AutoloaderStore extends AbstractStore<
	IAutoloaderStoreSettings
> {
	public name = 'autoloader'
	public scope = StoreScope.Local

	public autoloaders(): Autoloader[] {
		const autoloaders = this.readValue('autoloaders') ?? []
		return autoloaders
	}

	public removeAutoloader(autoloader: Autoloader) {
		const autoloaders = this.autoloaders().filter(
			a => a.lookupDir.path !== autoloader.lookupDir.path
		)
		this.writeValue('autoloaders', autoloaders)
	}

	public addAutoloader(autoloader: Autoloader, cwd?: string) {
		const instance = new Schema(
			SpruceSchemas.Local.Autoloader.definition,
			autoloader
		)
		const current = cwd || this.cwd
		const values = instance.getValues({
			byField: {
				lookupDir: { relativeTo: current },
				destination: { relativeTo: current }
			}
		})

		// pull current autoloader from all autoloaders (unique by dir)
		const autoloaders = this.autoloaders().filter(
			a => a.lookupDir.path !== values.lookupDir.path
		)

		autoloaders.push(values)
		this.writeValue('autoloaders', autoloaders)
	}
}
