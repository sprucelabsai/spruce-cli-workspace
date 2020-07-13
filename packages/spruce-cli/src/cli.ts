#!/usr/bin/env node

// eslint-disable-next-line import/order
import {
	Mercury,
	IMercuryConnectOptions,
	MercuryAuth,
} from '@sprucelabs/mercury'
import { Command, CommanderStatic } from 'commander'
// Shim
// eslint-disable-next-line import/order
import allSettled from 'promise.allsettled'
allSettled.shim()

import ErrorCode from '#spruce/errors/errorCode'
import './addons/filePrompt.addon'
import SpruceError from './errors/SpruceError'
import ServiceFactory, { Service } from './factories/ServiceFactory'
import FeatureCommandAttacher from './features/FeatureCommandAttacher'
import FeatureInstaller from './features/FeatureInstaller'
import FeatureInstallerFactory from './features/FeatureInstallerFactory'
import log from './singletons/log'
import StoreFactory from './stores/StoreFactory'
import { AuthedAs } from './types/cli.types'
import diskUtil from './utilities/disk.utility'

interface IHealthCheckResults {
	[featureKey: string]: IHealthCheckItem
}

interface IHealthCheckItem {
	status: 'failed' | 'passed'
	errors?: SpruceError[]
}

export interface ICli {
	installFeatures: FeatureInstaller['install']
	getFeature: FeatureInstaller['getFeature']
	checkHealth(): Promise<IHealthCheckResults>
}

export async function boot(options?: {
	cwd?: string
	program?: CommanderStatic['program']
}) {
	const program = options?.program

	// TODO pull in without including package.json
	// program?.version(pkg.version).description(pkg.description)
	program?.option('--no-color', 'Disable color output in the console')
	program?.option(
		'-d, --directory <path>',
		'The working directory to execute the command'
	)

	const cwd = options?.cwd ?? process.cwd()

	program?.on('option:directory', function () {
		if (program?.directory) {
			const newCwd = diskUtil.resolvePath(cwd, program.directory)
			log.trace(`CWD updated: ${newCwd}`)
		}
	})

	// const term = new TerminalInterface(cwd)
	const mercury = new Mercury()
	const serviceFactory = new ServiceFactory(mercury)
	const storeFactory = new StoreFactory(cwd, mercury, serviceFactory)

	const featureInstaller = FeatureInstallerFactory.WithAllFeatures({
		cwd,
		serviceFactory,
		storeFactory,
	})

	// attach features
	if (program) {
		const attacher = new FeatureCommandAttacher(program)
		const codes = FeatureInstallerFactory.featureCodes

		for (const code of codes) {
			const feature = featureInstaller.getFeature(code)
			await attacher.attachFeature(feature)
		}

		// Alphabetical sort of help output
		program.commands.sort((a: any, b: any) => a._name.localeCompare(b._name))

		// Error on unknown commands
		program.action((command, args) => {
			throw new SpruceError({ code: ErrorCode.InvalidCommand, args })
		})
	}

	// Setup mercury if logged in
	const isInstalled = await featureInstaller.isInstalled('skill')

	if (isInstalled) {
		const remoteStore = storeFactory.Store('remote')
		const remoteUrl = remoteStore.getRemoteUrl()

		// Who is logged in?
		const userStore = storeFactory.Store('user')
		const loggedInUser = userStore.getLoggedInUser()
		const skillStore = storeFactory.Store('skill')
		const loggedInSkill = skillStore.getLoggedInSkill()

		// Build mercury creds
		let creds: MercuryAuth | undefined
		const authType = remoteStore.authType

		switch (authType) {
			case AuthedAs.User:
				creds = loggedInUser && { token: loggedInUser.token }
				break
			case AuthedAs.Skill:
				creds = loggedInSkill && {
					id: loggedInSkill.id,
					apiKey: loggedInSkill.apiKey,
				}
				break
		}

		// Mercury connection options
		const connectOptions: IMercuryConnectOptions = {
			spruceApiUrl: remoteUrl,
			credentials: creds,
		}

		await mercury.connect(connectOptions)
	}

	const cli: ICli = {
		installFeatures: async (options) => {
			return featureInstaller.install(options)
		},

		getFeature: (code) => {
			return featureInstaller.getFeature(code)
		},

		checkHealth: async (): Promise<IHealthCheckResults> => {
			const isInstalled = await featureInstaller.isInstalled('skill')

			if (!isInstalled) {
				return {
					skill: {
						status: 'failed',
						errors: [
							new SpruceError({
								// @ts-ignore
								code: 'SKILL_NOT_INSTALLED',
							}),
						],
					},
				}
			}

			try {
				const commandService = serviceFactory.Service(cwd, Service.Command)
				const results = await commandService.execute('yarn health')
				const resultParts = results.stdout.split('#####DIVIDER#####')

				return JSON.parse(resultParts[1]) as IHealthCheckResults
			} catch (originalError) {
				const error = new SpruceError({
					// @ts-ignore
					code: 'BOOT_ERROR',
					originalError,
				})

				return {
					skill: {
						status: 'failed',
						errors: [error],
					},
				}
			}
		},
	}

	return cli
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
