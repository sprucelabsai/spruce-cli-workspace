#!/usr/bin/env node
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
import { terminal } from './utilities/Terminal'
import { Command } from 'commander'
import globby from 'globby'
import pkg from '../package.json'
import CliError from './lib/CliError'
import { services } from './services'

import { Mercury } from '@sprucelabs/mercury'
import { IStores } from './stores'
import StoreRemote from './stores/Remote'
import StoreSkill from './stores/Skill'
import StoreUser from './stores/User'
import StoreSchema from './stores/Schema'

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

	// setup remote store to load mercury
	const remoteStore = new StoreRemote()

	// setup mercury
	const remoteUrl = remoteStore.getRemoteUrl()
	const mercury = new Mercury({
		spruceApiUrl: remoteUrl
	})

	// setup stores
	const stores: IStores = {
		remote: remoteStore,
		skill: new StoreSkill(),
		user: new StoreUser(mercury),
		schema: new StoreSchema(mercury)
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
			throw new CliError(`I could not load the command at ${file}`, err)
		}
	})

	// Alphabetical sort of help output
	program.commands.sort((a: any, b: any) => a._name.localeCompare(b._name))

	// error on unknown commands
	program.action(() => {
		terminal.fatal(`Invalid command: ${program.args.join(' ')}`)
		terminal.fatal('See --help for a list of available commands.')
		process.exit(1)
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
