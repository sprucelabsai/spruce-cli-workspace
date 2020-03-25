#!/usr/bin/env node
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
import { terminal } from './utilities/Terminal'
import { Command } from 'commander'
import config from './utilities/Config'
import globby from 'globby'
import pkg from '../package.json'
import path from 'path'
import './utilities/handlebarsHelpers'
import CliError from './lib/CliError'

/**
 * For handling debugger not attaching right away
 */
const attachTimeoutMs = 0

async function setup(argv: string[], debugging: boolean): Promise<void> {
	const program = new Command()
	const commands = []
	if (debugging && attachTimeoutMs > 0) {
		terminal.info('Waiting for debugger to really attach...')
		await new Promise(resolve => {
			setTimeout(resolve, attachTimeoutMs)
		})
	}

	program.version(pkg.version).description(pkg.description)
	program.option('--no-color', 'Disable color output in the console')
	program.option(
		'-d, --directory <path>',
		'The working directory to execute the command'
	)

	program.on('option:directory', function() {
		if (program.directory) {
			process.chdir(path.resolve(program.directory))
			config.init()
		}
	})

	// Load commands and actions
	globby.sync(`${__dirname}/commands/**/*.js`).forEach(file => {
		try {
			const cmdClass = require(file).default
			const command = new cmdClass()

			command.attachCommands && command.attachCommands(program)
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
