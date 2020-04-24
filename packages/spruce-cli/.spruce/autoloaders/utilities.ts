// Import base class
import AbstractUtility from '../../src/utilities/AbstractUtility'

// Import each matching class that will be autoloaded
import Bootstrap from '../../src/utilities/BootstrapUtility'
import Names from '../../src/utilities/NamesUtility'
import Parser from '../../src/utilities/ParserUtility'
import Pkg from '../../src/utilities/PkgUtility'
import Schema from '../../src/utilities/SchemaUtility'
import Terminal from '../../src/utilities/TerminalUtility'
import TsConfig from '../../src/utilities/TsConfigUtility'

// Import necessary interface(s)
import { IUtilityOptions } from '../../src/utilities/AbstractUtility'

export interface IUtilities {
	bootstrap: Bootstrap
	names: Names
	parser: Parser
	pkg: Pkg
	schema: Schema
	terminal: Terminal
	tsConfig: TsConfig
}

export enum Utility {
	Bootstrap = 'bootstrap',
	Names = 'names',
	Parser = 'parser',
	Pkg = 'pkg',
	Schema = 'schema',
	Terminal = 'terminal',
	TsConfig = 'tsConfig',
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
	const names = new Names(constructorOptions)
	if (after) {
		await after(names)
	}
	const parser = new Parser(constructorOptions)
	if (after) {
		await after(parser)
	}
	const pkg = new Pkg(constructorOptions)
	if (after) {
		await after(pkg)
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
		names,
		parser,
		pkg,
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
	if (typeof names.afterAutoload === 'function') {
		// @ts-ignore method is optional
		names.afterAutoload(siblings)
	}
	// @ts-ignore method is optional
	if (typeof parser.afterAutoload === 'function') {
		// @ts-ignore method is optional
		parser.afterAutoload(siblings)
	}
	// @ts-ignore method is optional
	if (typeof pkg.afterAutoload === 'function') {
		// @ts-ignore method is optional
		pkg.afterAutoload(siblings)
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
