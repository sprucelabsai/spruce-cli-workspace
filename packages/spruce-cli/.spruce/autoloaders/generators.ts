// Import base class
import AbstractGenerator from '../../src/generators/AbstractGenerator'

// Import each matching class that will be autoloaded
import Core from '../../src/generators/CoreGenerator'
import Error from '../../src/generators/ErrorGenerator'
import Schema from '../../src/generators/SchemaGenerator'

// Import necessary interface(s)
import { IGeneratorOptions } from '../../src/generators/AbstractGenerator'

export interface IGenerators {
	core: Core
	error: Error
	schema: Schema
}

export default async function autoloader(options: {
	constructorOptions: IGeneratorOptions
	after?: (instance: AbstractGenerator) => Promise<void>
}): Promise<IGenerators> {
	const { constructorOptions, after } = options

	const core = new Core(constructorOptions)
	if (after) {
		await after(core)
	}
	const error = new Error(constructorOptions)
	if (after) {
		await after(error)
	}
	const schema = new Schema(constructorOptions)
	if (after) {
		await after(schema)
	}

	return {
		core,
		error,
		schema
	}
}
