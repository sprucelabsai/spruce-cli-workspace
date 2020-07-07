/* eslint-disable spruce/prefer-pascal-case-enums */
// Import necessary interface(s)
// Import each matching class that will be autoloaded
import ErrorGenerator from '#spruce/../generators/ErrorGenerator'
import SchemaGenerator from '#spruce/../generators/SchemaGenerator'

export type Generators =
	| ErrorGenerator
	| SchemaGenerator

export interface IGenerators {
	error: ErrorGenerator
	schema: SchemaGenerator
}

export enum Generator {
	Error = 'error',
	Schema = 'schema'
}

export default async function autoloader<K extends Generator[]>(options: {
	constructorOptions: any
	after?: (instance: Generators) => Promise<void>
	only?: K
}): Promise<K extends undefined ? IGenerators : Pick<IGenerators, K[number]>> {
	const { constructorOptions, after, only } = options
	const siblings: Partial<IGenerators> = {}


	if (!only || only.indexOf(Generator.Error) > -1) {
		const errorGenerator = new ErrorGenerator(constructorOptions)
		if (after) {
			await after(errorGenerator)
		}
		siblings.error = errorGenerator
	}
	if (!only || only.indexOf(Generator.Schema) > -1) {
		const schemaGenerator = new SchemaGenerator(constructorOptions)
		if (after) {
			await after(schemaGenerator)
		}
		siblings.schema = schemaGenerator
	}

	return siblings as K extends undefined
		? IGenerators
		: Pick<IGenerators, K[number]>
}
