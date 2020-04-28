#!/usr/bin/env node
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
import { register } from '@sprucelabs/path-resolver'
register({
	cwd: __dirname,
	extensions: ['.js', '.ts']
})

// Shim
import allSettled from 'promise.allsettled'
allSettled.shim()

import { Command } from 'commander'
import { templates } from '@sprucelabs/spruce-templates'
import {
	Mercury,
	IMercuryConnectOptions,
	MercuryAuth
} from '@sprucelabs/mercury'
import { terminal } from './utilities/TerminalUtility'
import pkg from '../package.json'
import log from './lib/log'
import { StoreAuth, IStoreOptions } from './stores/AbstractStore'
import { IGeneratorOptions } from './generators/AbstractGenerator'
import SpruceError from './errors/SpruceError'
import { ErrorCode } from '#spruce/errors/codes.types'
import { IUtilityOptions } from './utilities/AbstractUtility'
import { IServiceOptions } from './services/AbstractService'

import commandsLoader from '#spruce/autoloaders/commands'
import generatorsLoader from '#spruce/autoloaders/generators'
import storesAutoLoader from '#spruce/autoloaders/stores'
import utilitiesAutoloader from '#spruce/autoloaders/utilities'
import servicesAutoloader from '#spruce/autoloaders/services'
import featuresAutoloader from '#spruce/autoloaders/features'

/** Addons */
import './addons/filePrompt.addon'

export async function setup(program: Command) {
	program.version(pkg.version).description(pkg.description)
	program.option('--no-color', 'Disable color output in the console')
	program.option(
		'-d, --directory <path>',
		'The working directory to execute the command'
	)

	// Track everything autoloaded to handle env changes at runtime
	const autoLoaded: any[] = []

	// Update state for the entire process
	// TODO move this out and give more control when handling cross skill, e.g. "update something on only utilities"
	const updateState = function(key: string, value: any) {
		autoLoaded.forEach(loaded => (loaded[key] = value))
	}

	program.on('option:directory', function() {
		if (program.directory) {
			updateState('cwd', program.directory)
		}
	})

	const cwd = process.cwd()

	// Setup utilities
	const utilityOptions: IUtilityOptions = {
		cwd
	}

	const utilities = await utilitiesAutoloader({
		constructorOptions: utilityOptions
	})

	autoLoaded.push(...Object.values(utilities))

	// Setup mercury
	const mercury = new Mercury()

	const features = await featuresAutoloader({
		constructorOptions: { cwd, utilities }
	})

	// Setup services
	const serviceOptions: IServiceOptions = {
		mercury,
		cwd,
		utilities,
		features,
		templates
	}

	// Setup services
	const services = await servicesAutoloader({
		constructorOptions: serviceOptions
	})

	autoLoaded.push(...Object.values(services))

	// Setup services
	const storeOptions: IStoreOptions = {
		mercury,
		cwd,
		services,
		utilities
	}

	const stores = await storesAutoLoader({
		constructorOptions: storeOptions
	})

	autoLoaded.push(...Object.values(stores))

	// Setup mercury
	const remoteUrl = stores.remote.getRemoteUrl()

	// Who is logged in?
	const loggedInUser = stores.user.loggedInUser()
	const loggedInSkill = stores.skill.loggedInSkill()

	// Build mercury creds
	let creds: MercuryAuth | undefined
	const authType = stores.remote.authType

	switch (authType) {
		case StoreAuth.User:
			creds = loggedInUser && { token: loggedInUser.token }
			break
		case StoreAuth.Skill:
			creds = loggedInSkill && {
				id: loggedInSkill.id,
				apiKey: loggedInSkill.apiKey
			}
			break
	}

	// Mercury connection options
	const connectOptions: IMercuryConnectOptions = {
		spruceApiUrl: remoteUrl,
		credentials: creds
	}

	await mercury.connect(connectOptions)

	// Setup generators
	const generatorOptions: IGeneratorOptions = {
		services,
		utilities,
		templates,
		log,
		cwd,
		stores
	}

	const generators = await generatorsLoader({
		constructorOptions: generatorOptions
	})

	autoLoaded.push(...Object.values(generators))

	const commands = await commandsLoader({
		constructorOptions: {
			stores,
			mercury,
			services,
			cwd,
			generators,
			utilities,
			templates
		},
		after: async instance =>
			instance.attachCommands && instance.attachCommands(program)
	})

	autoLoaded.push(...Object.values(commands))

	// Alphabetical sort of help output
	program.commands.sort((a: any, b: any) => a._name.localeCompare(b._name))

	// Error on unknown commands
	program.action((command, args) => {
		throw new SpruceError({ code: ErrorCode.InvalidCommand, args })
	})

	// Final checks before we hand off to the command

	return {
		cwd,
		utilityOptions,
		utilities,
		mercury,
		serviceOptions,
		services,
		storeOptions,
		stores,
		connectOptions,
		generatorOptions,
		generators,
		commands
	}
}

/**
 * For handling debugger not attaching right away
 */
async function run(argv: string[], debugging: boolean): Promise<void> {
	const program = new Command()
	// Const commands = []
	if (debugging) {
		// eslint-disable-next-line no-debugger
		debugger // (breakpoints and debugger works after this one is missed)
		log.trace('Extra debugger dropped in so future debuggers work... 🤷‍')
	}

	await setup(program)

	const commandResult = await program.parseAsync(argv)
	if (commandResult.length === 0) {
		// No commands were found / executed
		program.outputHelp()
	}
}

if (process.env.TESTING !== 'true') {
	run(
		process.argv,
		typeof global.v8debug === 'object' ||
			/--debug|--inspect/.test(process.execArgv.join(' '))
	)
		.then(() => {
			process.exit(0)
		})
		.catch(e => {
			terminal.handleError(e)
			process.exit(1)
		})
}
