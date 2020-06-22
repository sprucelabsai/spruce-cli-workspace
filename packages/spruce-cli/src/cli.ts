#!/usr/bin/env node
// eslint-disable-next-line import/order
import { register } from '@sprucelabs/path-resolver'
register({
	cwd: __dirname,
	extensions: ['.js', '.ts']
})
// eslint-disable-next-line import/order
import {
	Mercury,
	IMercuryConnectOptions,
	MercuryAuth
} from '@sprucelabs/mercury'
import { templates } from '@sprucelabs/spruce-templates'
import { Command } from 'commander'
// Shim
// eslint-disable-next-line import/order
import allSettled from 'promise.allsettled'
allSettled.shim()

import commandsAutoloader from '#spruce/autoloaders/commands'
import generatorsAutoloader from '#spruce/autoloaders/generators'
import { IGenerators } from '#spruce/autoloaders/generators'
import { IStores } from '#spruce/autoloaders/stores'
import ErrorCode from '#spruce/errors/errorCode'
import pkg from '../package.json'
import './addons/filePrompt.addon'
import SpruceError from './errors/SpruceError'
import ServiceFactory from './factories/ServiceFactory'
import FeatureManager, {
	FeatureCode,
	IFeatureInstallResponse
} from './FeatureManager'
import TerminalInterface from './interfaces/TerminalInterface'
import log from './singletons/log'
import OnboardingStore from './stores/OnboardingStore'
import RemoteStore from './stores/RemoteStore'
import SchemaStore from './stores/SchemaStore'
import SkillStore from './stores/SkillStore'
import UserStore from './stores/UserStore'
import WatcherStore from './stores/WatcherStore'
import { AuthedAs } from './types/cli.types'
import diskUtil from './utilities/disk.utility'

export interface ICli {
	installFeature: (
		code: FeatureCode,
		options: any
	) => Promise<IFeatureInstallResponse>
}

export function buildStores(
	cwd: string,
	mercury: Mercury,
	serviceFactory: ServiceFactory
): IStores {
	return {
		skill: new SkillStore(cwd, mercury),
		onboarding: new OnboardingStore(cwd, mercury),
		remote: new RemoteStore(cwd, mercury),
		schema: new SchemaStore(cwd, serviceFactory),
		user: new UserStore(cwd, mercury),
		watcher: new WatcherStore(cwd, mercury)
	}
}

export async function boot(options?: {
	cwd?: string
	program?: Command
}): Promise<ICli> {
	const program = options?.program
	program?.version(pkg.version).description(pkg.description)
	program?.option('--no-color', 'Disable color output in the console')
	program?.option(
		'-d, --directory <path>',
		'The working directory to execute the command'
	)

	const cwd = options?.cwd ?? process.cwd()

	program?.on('option:directory', function() {
		if (program?.directory) {
			const newCwd = diskUtil.resolvePath(cwd, program.directory)
			log.trace(`CWD updated: ${newCwd}`)
		}
	})

	const term = new TerminalInterface(cwd)
	const mercury = new Mercury()
	const serviceFactory = new ServiceFactory(mercury)
	const stores: IStores = buildStores(cwd, mercury, serviceFactory)
	const generators: IGenerators = await generatorsAutoloader({
		constructorOptions: templates
	})

	const featureManager = FeatureManager.WithAllFeatures({
		cwd,
		serviceFactory
	})

	const commandOptions = {
		cwd,
		stores,
		serviceFactory,
		term,
		featureManager,
		generators
	}

	await commandsAutoloader({
		constructorOptions: commandOptions,
		after: async command => {
			program && command.attachCommands(program)
		}
	})

	// Alphabetical sort of help output
	program?.commands.sort((a: any, b: any) => a._name.localeCompare(b._name))

	// Error on unknown commands
	program?.action((command, args) => {
		throw new SpruceError({ code: ErrorCode.InvalidCommand, args })
	})

	// Setup mercury
	const remoteUrl = stores.remote.getRemoteUrl()

	// Who is logged in?
	const loggedInUser = stores.user.getLoggedInUser()
	const loggedInSkill = stores.skill.getLoggedInSkill()

	// Build mercury creds
	let creds: MercuryAuth | undefined
	const authType = stores.remote.authType

	switch (authType) {
		case AuthedAs.User:
			creds = loggedInUser && { token: loggedInUser.token }
			break
		case AuthedAs.Skill:
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
		installFeature: async (code, options) => {
			return featureManager.install({
				features: [
					{
						code,
						options
					}
				]
			})
		}
	}
}

/**
 * For handling debugger not attaching right away
 */
export async function run(
	argv: string[] = [],
	debugging: boolean
): Promise<void> {
	const program = new Command()
	// Const commands = []
	if (debugging) {
		// eslint-disable-next-line no-debugger
		debugger // (breakpoints and debugger works after this one is missed)
		log.trace('Extra debugger dropped in so future debuggers work... 🤷‍')
	}

	await boot({ program })

	const commandResult = await program.parseAsync(argv)
	if (commandResult.length === 0) {
		// No commands were found / executed
		program.outputHelp()
	}
}
