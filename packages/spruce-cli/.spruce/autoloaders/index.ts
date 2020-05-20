import commandAutoloader, { ICommands } from './commands'
import featureAutoloader, { IFeatures } from './features'
import generatorAutoloader, { IGenerators } from './generators'
import serviceAutoloader, { IServices } from './services'
import storeAutoloader, { IStores } from './stores'
import utilityAutoloader, { IUtilities } from './utilities'
import AbstractCommand, {
	ICommandOptions
} from '#spruce/../src/commands/AbstractCommand'
import AbstractFeature, {
	IFeatureOptions
} from '#spruce/../src/features/AbstractFeature'
import AbstractGenerator, {
	IGeneratorOptions
} from '#spruce/../src/generators/AbstractGenerator'
import AbstractService, {
	IServiceOptions
} from '#spruce/../src/services/AbstractService'
import AbstractStore, {
	IStoreOptions
} from '#spruce/../src/stores/AbstractStore'
import AbstractUtility, {
	IUtilityOptions
} from '#spruce/../src/utilities/AbstractUtility'

export interface IAutoloaderOptions {
	commands: {
		constructorOptions: ICommandOptions
		after?: (instance: AbstractCommand) => Promise<void>
	}
	stores: {
		constructorOptions: IStoreOptions
		after?: (instance: AbstractStore) => Promise<void>
	}
	services: {
		constructorOptions: IServiceOptions
		after?: (instance: AbstractService) => Promise<void>
	}
	features: {
		constructorOptions: IFeatureOptions
		after?: (instance: AbstractFeature) => Promise<void>
	}
	generators: {
		constructorOptions: IGeneratorOptions
		after?: (instance: AbstractGenerator) => Promise<void>
	}
	utilities: {
		constructorOptions: IUtilityOptions
		after?: (instance: AbstractUtility) => Promise<void>
	}
}

export interface IAutoloaded {
	commands: ICommands
	stores: IStores
	services: IServices
	features: IFeatures
	generators: IGenerators
	utilities: IUtilities
}

export interface IAutoLoadable {
	afterAutoload?(autoloaded: IAutoloaded): Promise<void>
}

export default async function rootAutoloader(
	options: IAutoloaderOptions
): Promise<IAutoloaded> {
	const commands = await commandAutoloader({
		constructorOptions: options.commands.constructorOptions,
		after: options.commands.after
	})
	const stores = await storeAutoloader({
		constructorOptions: options.stores.constructorOptions,
		after: options.stores.after
	})
	const services = await serviceAutoloader({
		constructorOptions: options.services.constructorOptions,
		after: options.services.after
	})
	const features = await featureAutoloader({
		constructorOptions: options.features.constructorOptions,
		after: options.features.after
	})
	const generators = await generatorAutoloader({
		constructorOptions: options.generators.constructorOptions,
		after: options.generators.after
	})
	const utilities = await utilityAutoloader({
		constructorOptions: options.utilities.constructorOptions,
		after: options.utilities.after
	})

	const autoloaded = {
		commands,
		stores,
		services,
		features,
		generators,
		utilities
	}

	let keys
	keys = Object.keys(commands)
	for (let i = 0; i < keys.length; i += 1) {
		const f = keys[i] as keyof ICommands
		if (typeof commands[f].afterAutoload === 'function') {
			await commands[f].afterAutoload(autoloaded)
		}
	}
	keys = Object.keys(stores)
	for (let i = 0; i < keys.length; i += 1) {
		const f = keys[i] as keyof IStores
		if (typeof stores[f].afterAutoload === 'function') {
			await stores[f].afterAutoload(autoloaded)
		}
	}
	keys = Object.keys(services)
	for (let i = 0; i < keys.length; i += 1) {
		const f = keys[i] as keyof IServices
		if (typeof services[f].afterAutoload === 'function') {
			await services[f].afterAutoload(autoloaded)
		}
	}
	keys = Object.keys(features)
	for (let i = 0; i < keys.length; i += 1) {
		const f = keys[i] as keyof IFeatures
		if (typeof features[f].afterAutoload === 'function') {
			await features[f].afterAutoload(autoloaded)
		}
	}
	keys = Object.keys(generators)
	for (let i = 0; i < keys.length; i += 1) {
		const f = keys[i] as keyof IGenerators
		if (typeof generators[f].afterAutoload === 'function') {
			await generators[f].afterAutoload(autoloaded)
		}
	}
	keys = Object.keys(utilities)
	for (let i = 0; i < keys.length; i += 1) {
		const f = keys[i] as keyof IUtilities
		if (typeof utilities[f].afterAutoload === 'function') {
			await utilities[f].afterAutoload(autoloaded)
		}
	}

	return autoloaded
}
