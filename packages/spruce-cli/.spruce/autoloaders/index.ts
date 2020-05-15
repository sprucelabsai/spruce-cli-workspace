import AbstractCommand, {
	ICommandOptions
} from '../../src/commands/AbstractCommand'
import AbstractFeature, {
	IFeatureOptions
} from '../../src/features/AbstractFeature'
import AbstractGenerator, {
	IGeneratorOptions
} from '../../src/generators/AbstractGenerator'
import AbstractService, {
	IServiceOptions
} from '../../src/services/AbstractService'
import AbstractStore, { IStoreOptions } from '../../src/stores/AbstractStore'
import AbstractUtility, {
	IUtilityOptions
} from '../../src/utilities/AbstractUtility'
import commandsAutoloader, { ICommands } from './commands'
import featuresAutoloader, { IFeatures } from './features'
import generatorsAutoloader, { IGenerators } from './generators'
import servicesAutoloader, { IServices } from './services'
import storesAutoloader, { IStores } from './stores'
import utilitiesAutoloader, { IUtilities } from './utilities'

export interface IAutoloaderOptions {
	commands: {
		constructorOptions: ICommandOptions
		after?: (instance: AbstractCommand) => Promise<void>
	}
	features: {
		constructorOptions: IFeatureOptions
		after?: (instance: AbstractFeature) => Promise<void>
	}
	generators: {
		constructorOptions: IGeneratorOptions
		after?: (instance: AbstractGenerator) => Promise<void>
	}
	services: {
		constructorOptions: IServiceOptions
		after?: (instance: AbstractService) => Promise<void>
	}
	stores: {
		constructorOptions: IStoreOptions
		after?: (instance: AbstractStore) => Promise<void>
	}
	utilities: {
		constructorOptions: IUtilityOptions
		after?: (instance: AbstractUtility) => Promise<void>
	}
}

export interface IAutoloaded {
	commands: ICommands
	features: IFeatures
	generators: IGenerators
	services: IServices
	stores: IStores
	utilities: IUtilities
}

export default async function autoloader(
	options: IAutoloaderOptions
): Promise<IAutoloaded> {
	const commands = await commandsAutoloader({
		constructorOptions: options.commands.constructorOptions,
		after: options.commands.after
	})
	const features = await featuresAutoloader({
		constructorOptions: options.features.constructorOptions,
		after: options.features.after
	})
	const generators = await generatorsAutoloader({
		constructorOptions: options.generators.constructorOptions,
		after: options.generators.after
	})
	const services = await servicesAutoloader({
		constructorOptions: options.services.constructorOptions,
		after: options.services.after
	})
	const stores = await storesAutoloader({
		constructorOptions: options.stores.constructorOptions,
		after: options.stores.after
	})
	const utilities = await utilitiesAutoloader({
		constructorOptions: options.utilities.constructorOptions,
		after: options.utilities.after
	})

	const autoloaded = {
		commands,
		features,
		generators,
		services,
		stores,
		utilities
	}

	let keys
	keys = Object.keys(commands)
	for (let i = 0; i < keys.length; i += 1) {
		const f = keys[i]
		if (typeof commands[f].afterAutoload === 'function') {
			await commands[f].afterAutoload(autoloaded)
		}
	}
	keys = Object.keys(features)
	for (let i = 0; i < keys.length; i += 1) {
		const f = keys[i]
		if (typeof features[f].afterAutoload === 'function') {
			await features[f].afterAutoload(autoloaded)
		}
	}
	keys = Object.keys(generators)
	for (let i = 0; i < keys.length; i += 1) {
		const f = keys[i]
		if (typeof generators[f].afterAutoload === 'function') {
			await generators[f].afterAutoload(autoloaded)
		}
	}
	keys = Object.keys(services)
	for (let i = 0; i < keys.length; i += 1) {
		const f = keys[i]
		if (typeof services[f].afterAutoload === 'function') {
			await services[f].afterAutoload(autoloaded)
		}
	}
	keys = Object.keys(stores)
	for (let i = 0; i < keys.length; i += 1) {
		const f = keys[i]
		if (typeof stores[f].afterAutoload === 'function') {
			await stores[f].afterAutoload(autoloaded)
		}
	}
	keys = Object.keys(utilities)
	for (let i = 0; i < keys.length; i += 1) {
		const f = keys[i]
		if (typeof utilities[f].afterAutoload === 'function') {
			await utilities[f].afterAutoload(autoloaded)
		}
	}

	return autoloaded
}
