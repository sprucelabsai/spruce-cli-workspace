/* eslint-disable spruce/prefer-pascal-case-enums */
// Import necessary interface(s)
import { IGeneratorOptions } from '#spruce/../src/generators/AbstractGenerator'
// Import each matching class that will be autoloaded
import AutoloaderGenerator from '#spruce/../src/generators/AutoloaderGenerator'
import CoreGenerator from '#spruce/../src/generators/CoreGenerator'
import ErrorGenerator from '#spruce/../src/generators/ErrorGenerator'
import SchemaGenerator from '#spruce/../src/generators/SchemaGenerator'


export type Generators = AutoloaderGenerator | CoreGenerator | ErrorGenerator | SchemaGenerator

export interface IGenerators {
	autoloader: AutoloaderGenerator
	core: CoreGenerator
	error: ErrorGenerator
	schema: SchemaGenerator
}

export enum Generator {
	Autoloader = 'autoloader',
	Core = 'core',
	Error = 'error',
	Schema = 'schema',
}

export default async function autoloader<
	K extends Generator[]
>(options: {
	constructorOptions:   IGeneratorOptions
	after?: (instance: Generators) => Promise<void>
	only?: K
}): Promise<K extends undefined ? IGenerators : Pick<IGenerators, K[number]>> {
	const { constructorOptions, after, only } = options
	const siblings:Partial<IGenerators> = {}

	if (!only || only.indexOf(Generator.Autoloader) === -1) {
		const autoloaderGenerator = new AutoloaderGenerator(constructorOptions)
		if (after) {
			await after(autoloaderGenerator)
		}
		siblings.autoloader = autoloaderGenerator
	}
	if (!only || only.indexOf(Generator.Core) === -1) {
		const coreGenerator = new CoreGenerator(constructorOptions)
		if (after) {
			await after(coreGenerator)
		}
		siblings.core = coreGenerator
	}
	if (!only || only.indexOf(Generator.Error) === -1) {
		const errorGenerator = new ErrorGenerator(constructorOptions)
		if (after) {
			await after(errorGenerator)
		}
		siblings.error = errorGenerator
	}
	if (!only || only.indexOf(Generator.Schema) === -1) {
		const schemaGenerator = new SchemaGenerator(constructorOptions)
		if (after) {
			await after(schemaGenerator)
		}
		siblings.schema = schemaGenerator
	}

	return siblings as K extends undefined ? IGenerators : Pick<IGenerators, K[number]>
}
