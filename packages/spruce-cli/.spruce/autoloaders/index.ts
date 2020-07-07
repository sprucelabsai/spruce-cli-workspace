import commandAutoloader, { ICommands, Commands, Command } from './commands'
import featureAutoloader, { IFeatures, Features, Feature } from './features'
import generatorAutoloader, {
	IGenerators,
	Generators,
	Generator
} from './generators'
import serviceAutoloader, { IServices, Services, Service } from './services'
import storeAutoloader, { IStores, Stores, Store } from './stores'
import utilityAutoloader, { IUtilities, Utilities, Utility } from './utilities'
import { ICommandOptions } from '#spruce/../src/commands/AbstractCommand'
import { IFeatureOptions } from '#spruce/../src/features/AbstractFeature'
import { IGeneratorOptions } from '#spruce/../src/generators/AbstractGenerator'
import { IServiceOptions } from '#spruce/../src/services/AbstractService'
import { IStoreOptions } from '#spruce/../src/stores/AbstractStore'
import { IUtilityOptions } from '#spruce/../src/utilities/AbstractUtility'

export interface IAutoloaderOptions {
	commands: {
		constructorOptions: ICommandOptions
		after?: (instance: Commands) => Promise<void>
		only?: Command[]
	}
	stores: {
		constructorOptions: IStoreOptions
		after?: (instance: Stores) => Promise<void>
		only?: Store[]
	}
	services: {
		constructorOptions: IServiceOptions
		after?: (instance: Services) => Promise<void>
		only?: Service[]
	}
	features: {
		constructorOptions: IFeatureOptions
		after?: (instance: Features) => Promise<void>
		only?: Feature[]
	}
	generators: {
		constructorOptions: IGeneratorOptions
		after?: (instance: Generators) => Promise<void>
		only?: Generator[]
	}
	utilities: {
		constructorOptions: IUtilityOptions
		after?: (instance: Utilities) => Promise<void>
		only?: Utility[]
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
		after: options.commands.after,
		only: options.commands.only
	})
	const stores = await storeAutoloader({
		constructorOptions: options.stores.constructorOptions,
		after: options.stores.after,
		only: options.stores.only
	})
	const services = await serviceAutoloader({
		constructorOptions: options.services.constructorOptions,
		after: options.services.after,
		only: options.services.only
	})
	const features = await featureAutoloader({
		constructorOptions: options.features.constructorOptions,
		after: options.features.after,
		only: options.features.only
	})
	const generators = await generatorAutoloader({
		constructorOptions: options.generators.constructorOptions,
		after: options.generators.after,
		only: options.generators.only
	})
	const utilities = await utilityAutoloader({
		constructorOptions: options.utilities.constructorOptions,
		after: options.utilities.after,
		only: options.utilities.only
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
