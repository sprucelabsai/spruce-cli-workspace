/* eslint-disable spruce/prefer-pascal-case-enums */
// Import necessary interface(s)
import { IUtilityOptions } from '#spruce/../src/utilities/AbstractUtility'
// Import each matching class that will be autoloaded
import AutoloaderUtility from '#spruce/../src/utilities/AutoloaderUtility'
import BootstrapUtility from '#spruce/../src/utilities/BootstrapUtility'
import IntrospectionUtility from '#spruce/../src/utilities/IntrospectionUtility'
import NamesUtility from '#spruce/../src/utilities/NamesUtility'
import SchemaUtility from '#spruce/../src/utilities/SchemaUtility'
import TerminalUtility from '#spruce/../src/utilities/TerminalUtility'
import TsConfigUtility from '#spruce/../src/utilities/TsConfigUtility'

export type Utilities =
	| AutoloaderUtility
	| BootstrapUtility
	| IntrospectionUtility
	| NamesUtility
	| SchemaUtility
	| TerminalUtility
	| TsConfigUtility

export interface IUtilities {
	autoloader: AutoloaderUtility
	bootstrap: BootstrapUtility
	introspection: IntrospectionUtility
	names: NamesUtility
	schema: SchemaUtility
	terminal: TerminalUtility
	tsConfig: TsConfigUtility
}

export enum Utility {
	Autoloader = 'autoloader',
	Bootstrap = 'bootstrap',
	Introspection = 'introspection',
	Names = 'names',
	Schema = 'schema',
	Terminal = 'terminal',
	TsConfig = 'tsConfig'
}

export default async function autoloader<K extends Utility[]>(options: {
	constructorOptions: IUtilityOptions
	after?: (instance: Utilities) => Promise<void>
	only?: K
}): Promise<K extends undefined ? IUtilities : Pick<IUtilities, K[number]>> {
	const { constructorOptions, after, only } = options
	const siblings: Partial<IUtilities> = {}

	if (!only || only.indexOf(Utility.Autoloader) > -1) {
		const autoloaderUtility = new AutoloaderUtility(constructorOptions)
		if (after) {
			await after(autoloaderUtility)
		}
		siblings.autoloader = autoloaderUtility
	}
	if (!only || only.indexOf(Utility.Bootstrap) > -1) {
		const bootstrapUtility = new BootstrapUtility(constructorOptions)
		if (after) {
			await after(bootstrapUtility)
		}
		siblings.bootstrap = bootstrapUtility
	}
	if (!only || only.indexOf(Utility.Introspection) > -1) {
		const introspectionUtility = new IntrospectionUtility(constructorOptions)
		if (after) {
			await after(introspectionUtility)
		}
		siblings.introspection = introspectionUtility
	}
	if (!only || only.indexOf(Utility.Names) > -1) {
		const namesUtility = new NamesUtility(constructorOptions)
		if (after) {
			await after(namesUtility)
		}
		siblings.names = namesUtility
	}
	if (!only || only.indexOf(Utility.Schema) > -1) {
		const schemaUtility = new SchemaUtility(constructorOptions)
		if (after) {
			await after(schemaUtility)
		}
		siblings.schema = schemaUtility
	}
	if (!only || only.indexOf(Utility.Terminal) > -1) {
		const terminalUtility = new TerminalUtility(constructorOptions)
		if (after) {
			await after(terminalUtility)
		}
		siblings.terminal = terminalUtility
	}
	if (!only || only.indexOf(Utility.TsConfig) > -1) {
		const tsConfigUtility = new TsConfigUtility(constructorOptions)
		if (after) {
			await after(tsConfigUtility)
		}
		siblings.tsConfig = tsConfigUtility
	}

	return siblings as K extends undefined
		? IUtilities
		: Pick<IUtilities, K[number]>
}
