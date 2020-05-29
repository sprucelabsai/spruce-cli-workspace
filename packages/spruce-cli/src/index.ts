#!/usr/bin/env node
// eslint-disable-next-line import/order
import { register } from '@sprucelabs/path-resolver'
register({
	cwd: __dirname,
	extensions: ['.js', '.ts']
})
// Shim
// eslint-disable-next-line import/order
import allSettled from 'promise.allsettled'
allSettled.shim()
import {
	Mercury,
	IMercuryConnectOptions,
	MercuryAuth,
	MercuryMock
} from '@sprucelabs/mercury'
import { templates } from '@sprucelabs/spruce-templates'
import { Command } from 'commander'
import autoloader from '#spruce/autoloaders'
import { Commands } from '#spruce/autoloaders/commands'
import { ErrorCode } from '#spruce/errors/codes.types'
import pkg from '../package.json'
/** Addons */
import './addons/filePrompt.addon'
import Autoloadable from './Autoloadable'
import { ICommandOptions } from './commands/AbstractCommand'
import SpruceError from './errors/SpruceError'
import { IFeatureOptions } from './features/AbstractFeature'
import { IGeneratorOptions } from './generators/AbstractGenerator'
import log from './lib/log'
import path from './lib/path'
import { IServiceOptions } from './services/AbstractService'
import { StoreAuth, IStoreOptions } from './stores/AbstractStore'
import { IUtilityOptions } from './utilities/AbstractUtility'
import { terminal } from './utilities/TerminalUtility'

export async function setup(options?: { program?: Command; cwd?: string }) {
	const program = options?.program
	program?.version(pkg.version).description(pkg.description)
	program?.option('--no-color', 'Disable color output in the console')
	program?.option(
		'-d, --directory <path>',
		'The working directory to execute the command'
	)

	// Track everything autoloaded to handle env changes at runtime
	const autoLoaded: Autoloadable[] = []

	// Update state for the entire process
	// TODO move this out and give more control when handling cross skill, e.g. "update x on only utilities"
	const updateCwd = function(newCwd: string) {
		autoLoaded.forEach(loaded => (loaded.cwd = newCwd))
	}

	const cwd = options?.cwd ?? process.cwd()

	program?.on('option:directory', function() {
		if (program?.directory) {
			const newCwd = path.resolvePath(cwd, program.directory)
			log.trace(`CWD updated: ${newCwd}`)
			updateCwd(newCwd)
		}
	})

	// Setup utilities
	const utilityOptions: IUtilityOptions = {
		cwd
	}

	// Setup mercury
	const mercury =
		process.env.TESTING === 'true' ? new MercuryMock() : new Mercury()

	// Setup services
	const serviceOptions: IServiceOptions = {
		mercury,
		cwd,
		templates
	}

	// Setup services
	const storeOptions: IStoreOptions = {
		mercury,
		cwd
	}

	// Setup generators
	const generatorOptions: IGeneratorOptions = {
		templates,
		cwd
	}

	const featureOptions: IFeatureOptions = {
		templates,
		cwd
	}

	// Alias everything that has a : with a . so "option delete" deletes up to the period
	if (program) {
		const originalCommand = program.command.bind(program)
		program.command = (name: string) => {
			const response = originalCommand(name)
			const firstPart = name.split(' ')[0]
			const alias = firstPart.replace(':', '.')
			if (alias !== firstPart) {
				program.alias(alias)
			}
			return response
		}
	}

	const commandOptions: ICommandOptions = {
		mercury,
		cwd,
		templates
	}

	const {
		utilities,
		services,
		stores,
		generators,
		commands
	} = await autoloader({
		commands: {
			constructorOptions: commandOptions,
			after: async (instance: Commands) =>
				instance.attachCommands && program && instance.attachCommands(program)
		},
		utilities: {
			constructorOptions: utilityOptions
		},
		stores: {
			constructorOptions: storeOptions
		},
		services: {
			constructorOptions: serviceOptions
		},
		features: {
			constructorOptions: featureOptions
		},
		generators: {
			constructorOptions: generatorOptions
		}
	})

	// Alphabetical sort of help output
	program?.commands.sort((a: any, b: any) => a._name.localeCompare(b._name))

	// Error on unknown commands
	program?.action((command, args) => {
		throw new SpruceError({ code: ErrorCode.InvalidCommand, args })
	})

	// Final checks before we hand off to the command

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

	await setup({ program })

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
