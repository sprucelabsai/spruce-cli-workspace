/* eslint-disable spruce/prefer-pascal-case-enums */
// Import base class
import AbstractUtility from '../../src/utilities/AbstractUtility'
// Import each matching class that will be autoloaded
import { IUtilityOptions } from '../../src/utilities/AbstractUtility'
import Bootstrap from '../../src/utilities/BootstrapUtility'
import Introspection from '../../src/utilities/IntrospectionUtility'
import Names from '../../src/utilities/NamesUtility'
import Schema from '../../src/utilities/SchemaUtility'
import Terminal from '../../src/utilities/TerminalUtility'
import TsConfig from '../../src/utilities/TsConfigUtility'

// Import necessary interface(s)

export interface IUtilities {
	[utility: string]:
		| Bootstrap
		| Introspection
		| Names
		| Schema
		| Terminal
		| TsConfig
	bootstrap: Bootstrap
	introspection: Introspection
	names: Names
	schema: Schema
	terminal: Terminal
	tsConfig: TsConfig
}

export enum Utility {
	Bootstrap = 'bootstrap',
	Introspection = 'introspection',
	Names = 'names',
	Schema = 'schema',
	Terminal = 'terminal',
	TsConfig = 'tsConfig'
}

export default async function autoloader(options: {
	constructorOptions: IUtilityOptions
	after?: (instance: AbstractUtility) => Promise<void>
}): Promise<IUtilities> {
	const { constructorOptions, after } = options

	const bootstrap = new Bootstrap(constructorOptions)
	if (after) {
		await after(bootstrap)
	}
	const introspection = new Introspection(constructorOptions)
	if (after) {
		await after(introspection)
	}
	const names = new Names(constructorOptions)
	if (after) {
		await after(names)
	}
	const schema = new Schema(constructorOptions)
	if (after) {
		await after(schema)
	}
	const terminal = new Terminal(constructorOptions)
	if (after) {
		await after(terminal)
	}
	const tsConfig = new TsConfig(constructorOptions)
	if (after) {
		await after(tsConfig)
	}

	const siblings: IUtilities = {
		bootstrap,
		introspection,
		names,
		schema,
		terminal,
		tsConfig
	}

	// @ts-ignore method is optional
	if (typeof bootstrap.afterAutoload === 'function') {
		// @ts-ignore method is optional
		bootstrap.afterAutoload(siblings)
	}
	// @ts-ignore method is optional
	if (typeof introspection.afterAutoload === 'function') {
		// @ts-ignore method is optional
		introspection.afterAutoload(siblings)
	}
	// @ts-ignore method is optional
	if (typeof names.afterAutoload === 'function') {
		// @ts-ignore method is optional
		names.afterAutoload(siblings)
	}
	// @ts-ignore method is optional
	if (typeof schema.afterAutoload === 'function') {
		// @ts-ignore method is optional
		schema.afterAutoload(siblings)
	}
	// @ts-ignore method is optional
	if (typeof terminal.afterAutoload === 'function') {
		// @ts-ignore method is optional
		terminal.afterAutoload(siblings)
	}
	// @ts-ignore method is optional
	if (typeof tsConfig.afterAutoload === 'function') {
		// @ts-ignore method is optional
		tsConfig.afterAutoload(siblings)
	}

	return siblings
}
