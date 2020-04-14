// Import base class
import AbstractUtility from '../../src/utilities/AbstractUtility'

// Import each matching class that will be autoloaded
import Bootstrap from '../../src/utilities/BootstrapUtility'
import Names from '../../src/utilities/NamesUtility'
import Pkg from '../../src/utilities/PkgUtility'
import Schema from '../../src/utilities/SchemaUtility'
import Terminal from '../../src/utilities/TerminalUtility'
import TsConfig from '../../src/utilities/TsConfigUtility'

// Import necessary interface(s)
import { IUtilityOptions } from '../../src/utilities/AbstractUtility'

export interface IUtilities {
	bootstrap: Bootstrap
	names: Names
	pkg: Pkg
	schema: Schema
	terminal: Terminal
	tsConfig: TsConfig
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

	return {
		bootstrap,
		names,
		pkg,
		schema,
		terminal,
		tsConfig
	}
}
