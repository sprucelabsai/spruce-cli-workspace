#!/usr/bin/env node
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
import path from 'path'
import { register } from '@sprucelabs/path-resolver'
register({
	tsConfigDir: path.join(__dirname, '../'),
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
import { StoreAuth } from './stores/AbstractStore'
import { IGeneratorOptions } from './generators/AbstractGenerator'
import SpruceError from './errors/SpruceError'
import { ErrorCode } from '#spruce/errors/codes.types'
import { IUtilityOptions } from './utilities/AbstractUtility'
import { IServiceOptions } from './services/AbstractService'

import commandsLoader from '#spruce/autoloaders/commands'
import generatorsLoader from '#spruce/autoloaders/generators'
import storesLoader from '#spruce/autoloaders/stores'
import utilitiesAutoloader from '#spruce/autoloaders/utilities'
import servicesAutoloader from '#spruce/autoloaders/services'

/** Addons */
import './addons/filePrompt.addon'
import '#spruce/schemas/fields.types'

/**
 * For handling debugger not attaching right away
 */
async function setup(argv: string[], debugging: boolean): Promise<void> {
	const program = new Command()
	// Const commands = []
	if (debugging) {
		// eslint-disable-next-line no-debugger
		debugger // (breakpoints and debugger works after this one is missed)
		log.trace('Extra debugger dropped in so future debuggers work... 🤷‍')
	}

	program.version(pkg.version).description(pkg.description)
	program.option('--no-color', 'Disable color output in the console')
	program.option(
		'-d, --directory <path>',
		'The working directory to execute the command'
	)

	program.on('option:directory', function() {
		if (program.directory) {
			// TODO: Implement ability to set cwd
			throw new SpruceError({
				code: ErrorCode.NotImplemented,
				command: 'option:directory',
				friendlyMessage: 'Setting the cwd is not yet implemented'
			})
		}
	})

	// Starting cwd
	const cwd = process.cwd()

	// Setup log

	// Setup utilities
	const utilityOptions: IUtilityOptions = {
		cwd
	}

	const utilities = await utilitiesAutoloader({
		constructorOptions: utilityOptions
	})

	// Setup mercury
	const mercury = new Mercury()

	// Setup stores
	const storeOptions = {
		mercury,
		cwd,
		log,
		utilities
	}

	const stores = await storesLoader({
		constructorOptions: storeOptions
	})

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

	// Setup services
	const serviceOptions: IServiceOptions = {
		mercury,
		cwd,
		log,
		utilities
	}

	// Setup services
	const services = await servicesAutoloader({
		constructorOptions: serviceOptions
	})

	// Setup generators
	const generatorOptions: IGeneratorOptions = {
		services,
		utilities,
		templates,
		log,
		cwd
	}

	const generators = await generatorsLoader({
		constructorOptions: generatorOptions
	})

	await commandsLoader({
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

	// Alphabetical sort of help output
	program.commands.sort((a: any, b: any) => a._name.localeCompare(b._name))

	// Error on unknown commands
	program.action((command, args) => {
		throw new SpruceError({ code: ErrorCode.InvalidCommand, args })
	})

	const commandResult = await program.parseAsync(argv)
	if (commandResult.length === 0) {
		// No commands were found / executed
		program.outputHelp()
	}
}

setup(
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
