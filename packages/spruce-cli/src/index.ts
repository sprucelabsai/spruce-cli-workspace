#!/usr/bin/env node
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
import { terminal } from './utilities/TerminalUtility'
import { Command } from 'commander'
import globby from 'globby'
import pkg from '../package.json'
import { IServices } from './services'
import log, { LogLevel } from '@sprucelabs/log'
import {
	Mercury,
	IMercuryConnectOptions,
	MercuryAuth
} from '@sprucelabs/mercury'
import { IStores } from './stores'
import RemoteStore from './stores/RemoteStore'
import SkillStore from './stores/SkillStore'
import UserStore from './stores/UserStore'
import SchemaStore from './stores/SchemaStore'
import PinService from './services/PinService'
import AbstractCommand, { ICommandOptions } from './commands/Abstract'
import OnboardingStore from './stores/OnboardingStore'
import { IGenerators } from './generators'
import SchemaGenerator from './generators/Schema'
import { IUtilities } from './utilities'
import NamesUtility from './utilities/NamesUtility'
import { StoreAuth } from './stores/AbstractStore'
import CoreGenerator from './generators/Core'
import { IGeneratorOptions } from './generators/Abstract'
import { templates } from '@sprucelabs/spruce-templates'
import ErrorGenerator from './generators/Error'
import SpruceError from './errors/Error'
import { ErrorCode } from './.spruce/errors/codes.types'
import VmService from './services/VmService'
import { IUtilityOptions } from './utilities/AbstractUtility'

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

	// starting cwd
	const cwd = process.cwd()
	// Force run in schema for now
	// const cwd = '/Users/taylorromero/Development/SpruceLabs/spruce-schema'

	// setup log
	log.setOptions({ level: LogLevel.Info })

	// setup mercury
	const mercury = new Mercury()

	// setup stores
	const storeOptions = {
		mercury,
		cwd,
		log
	}

	const stores: IStores = {
		remote: new RemoteStore(storeOptions),
		skill: new SkillStore(storeOptions),
		user: new UserStore(storeOptions),
		schema: new SchemaStore(storeOptions),
		onboarding: new OnboardingStore(storeOptions)
	}

	// setup mercury
	const remoteUrl = stores.remote.getRemoteUrl()

	// who is logged in?
	const loggedInUser = stores.user.loggedInUser()
	const loggedInSkill = stores.skill.loggedInSkill()

	// build mercury creds
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

	// mercury connection options
	const connectOptions: IMercuryConnectOptions = {
		spruceApiUrl: remoteUrl,
		credentials: creds
	}

	await mercury.connect(connectOptions)

	const serviceOptions = {
		mercury,
		cwd
	}

	// setup services
	const services: IServices = {
		pin: new PinService(serviceOptions),
		vm: new VmService(serviceOptions)
	}

	// setup utilities
	const utilityOptions: IUtilityOptions = {
		cwd
	}

	const utilities: IUtilities = {
		names: new NamesUtility(utilityOptions)
	}

	// setup generators
	const generatorOptions: IGeneratorOptions = {
		utilities,
		templates,
		log,
		cwd
	}

	const generators: IGenerators = {
		schema: new SchemaGenerator(generatorOptions),
		core: new CoreGenerator(generatorOptions),
		error: new ErrorGenerator(generatorOptions)
	}

	// Load commands and actions
	globby.sync(`${__dirname}/commands/**/*.js`).forEach(file => {
		try {
			// import and type the command
			const cmdClass: new (
				options: ICommandOptions
			) => AbstractCommand = require(file).default

			// instantiate the command
			const command = new cmdClass({
				stores,
				mercury,
				services,
				cwd,
				log,
				generators,
				utilities,
				templates
			})

			// attach commands to the program
			command.attachCommands && command.attachCommands(program)

			// track all commands
			commands.push(command)
		} catch (err) {
			throw new SpruceError({
				code: ErrorCode.CouldNotLoadCommand,
				originalError: err,
				file
			})
		}
	})

	// Alphabetical sort of help output
	program.commands.sort((a: any, b: any) => a._name.localeCompare(b._name))

	// error on unknown commands
	program.action((command, args) => {
		throw new SpruceError({ code: ErrorCode.InvalidCommand, args })
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
