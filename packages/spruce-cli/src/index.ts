#!/usr/bin/env node
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
import { terminal } from './utilities/Terminal'
import { Command } from 'commander'
import globby from 'globby'
import pkg from '../package.json'
import CliError from './errors/CliError'
import { IServices } from './services'

import { Mercury, IMercuryConnectOptions } from '@sprucelabs/mercury'
import { IStores } from './stores'
import RemoteStore from './stores/Remote'
import SkillStore from './stores/Skill'
import UserStore from './stores/User'
import SchemaStore from './stores/Schema'
import { CliErrorCode } from './errors/types'
import PinService from './services/Pin'

/**
 * For handling debugger not attaching right away
 */
async function setup(argv: string[], debugging: boolean): Promise<void> {
	const program = new Command()
	const commands = []
	if (debugging) {
		// eslint-disable-next-line no-debugger
		debugger // (breakpoints and debugger works after this one is missed)
		terminal.info('Extra debugger dropped in so future debuggers work... 🤷‍')
	}

	program.version(pkg.version).description(pkg.description)
	program.option('--no-color', 'Disable color output in the console')
	program.option(
		'-d, --directory <path>',
		'The working directory to execute the command'
	)

	program.on('option:directory', function() {
		if (program.directory) {
			throw new Error('another path forward')
			// process.chdir(path.resolve(program.directory))
			// config.init()
		}
	})

	// setup mercury
	const mercury = new Mercury()

	// setup stores
	const stores: IStores = {
		remote: new RemoteStore(),
		skill: new SkillStore(),
		user: new UserStore(mercury),
		schema: new SchemaStore(mercury)
	}

	// is there anyone logged in?
	const loggedInUser = stores.user.loggedInUser()
	const remoteUrl = stores.remote.getRemoteUrl()

	const connectOptions: IMercuryConnectOptions = {
		spruceApiUrl: remoteUrl,
		credentials: loggedInUser && {
			token: loggedInUser.token
		}
	}

	await mercury.connect(connectOptions)

	// setup services
	const services: IServices = {
		pin: new PinService(mercury)
	}

	// Load commands and actions
	globby.sync(`${__dirname}/commands/**/*.js`).forEach(file => {
		try {
			// instantiate the command
			const cmdClass = require(file).default
			const command = new cmdClass({
				stores,
				mercury,
				services
			})

			// attach commands to the program
			command.attachCommands && command.attachCommands(program)

			// track all commands
			commands.push(command)
		} catch (err) {
			throw new CliError({
				code: CliErrorCode.CouldNotLoadCommand,
				lastError: err,
				file
			})
		}
	})

	// Alphabetical sort of help output
	program.commands.sort((a: any, b: any) => a._name.localeCompare(b._name))

	// error on unknown commands
	program.action((command, args) => {
		throw new CliError({ code: CliErrorCode.InvalidCommand, args })
	})

	const commandResult = await program.parseAsync(argv)

	if (commandResult.length === 0) {
		// No commands were found / executed
		program.outputHelp()
	}
}

setup(process.argv, process.debugPort > 0)
	.then(() => {
		process.exit(0)
	})
	.catch(e => {
		terminal.handleError(e)
		process.exit(1)
	})
