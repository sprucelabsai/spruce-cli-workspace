/* eslint-disable spruce/prefer-pascal-case-enums */
// Import base class
import AbstractGenerator from '../../src/generators/AbstractGenerator'
// Import each matching class that will be autoloaded
import { IGeneratorOptions } from '../../src/generators/AbstractGenerator'
import Core from '../../src/generators/CoreGenerator'
import Error from '../../src/generators/ErrorGenerator'
import Schema from '../../src/generators/SchemaGenerator'

// Import necessary interface(s)

export interface IGenerators {
	[generator: string]: Core | Error | Schema
	core: Core
	error: Error
	schema: Schema
}

export enum Generator {
	Core = 'core',
	Error = 'error',
	Schema = 'schema'
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

	const siblings: IGenerators = {
		core,
		error,
		schema
	}

	// // @ts-ignore method is optional
	// if (typeof core.afterAutoload === 'function') {
	// 	// @ts-ignore method is optional
	// 	core.afterAutoload(siblings)
	// }
	// // @ts-ignore method is optional
	// if (typeof error.afterAutoload === 'function') {
	// 	// @ts-ignore method is optional
	// 	error.afterAutoload(siblings)
	// }
	// // @ts-ignore method is optional
	// if (typeof schema.afterAutoload === 'function') {
	// 	// @ts-ignore method is optional
	// 	schema.afterAutoload(siblings)
	// }

	return siblings
}
