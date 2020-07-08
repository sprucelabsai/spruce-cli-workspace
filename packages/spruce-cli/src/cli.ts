#!/usr/bin/env node

// eslint-disable-next-line import/order
import {
	Mercury,
	IMercuryConnectOptions,
	MercuryAuth,
} from '@sprucelabs/mercury'
import { templates, IValueTypes } from '@sprucelabs/spruce-templates'
import { Command, CommanderStatic } from 'commander'
// Shim
// eslint-disable-next-line import/order
import allSettled from 'promise.allsettled'
allSettled.shim()

import commandsAutoloader from '#spruce/autoloaders/commands'
import generatorsAutoloader from '#spruce/autoloaders/generators'
import { IGenerators } from '#spruce/autoloaders/generators'
import { IStores } from '#spruce/autoloaders/stores'
import ErrorCode from '#spruce/errors/errorCode'
import './addons/filePrompt.addon'
import SpruceError from './errors/SpruceError'
import ServiceFactory, { Service } from './factories/ServiceFactory'
import FeatureManager, {
	IInstallFeatureOptions,
	FeatureCode,
	IFeatureInstallResponse,
} from './features/FeatureManager'
import { GenerationResults } from './generators/AbstractGenerator'
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
		watcher: new WatcherStore(cwd, mercury),
	}
}

/**
 * {
			skill: {
				status: 'failed',
				errors: [{ code: 'BOOT_ERROR', message: /module not found/ }]
			}
		}
 */

interface IHealthCheckResults {
	[featureKey: string]: IHealthCheckItem
}

interface IHealthCheckItem {
	status: 'failed' | 'passed'
	errors?: SpruceError[]
}

export interface ICli {
	installFeatures<F extends FeatureCode>(
		options: IInstallFeatureOptions<F>
	): Promise<IFeatureInstallResponse>

	createSchema(options: {
		destinationDir?: string
		nameReadable: string
		namePascal: string
		nameCamel: string
		description?: string
		addonLookupDir?: string
	}): Promise<GenerationResults>

	syncSchemas(options?: {
		lookupDir?: string
		destinationDir?: string
		addonLookupDir?: string
	}): Promise<GenerationResults>

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

	const term = new TerminalInterface(cwd)
	const mercury = new Mercury()
	const serviceFactory = new ServiceFactory(mercury)
	const stores: IStores = buildStores(cwd, mercury, serviceFactory)
	const generators: IGenerators = await generatorsAutoloader({
		constructorOptions: templates,
	})

	const featureManager = FeatureManager.WithAllFeatures({
		cwd,
		serviceFactory,
	})

	const commandOptions = {
		cwd,
		stores,
		serviceFactory,
		term,
		featureManager,
		generators,
	}

	await commandsAutoloader({
		constructorOptions: commandOptions,
		after: async (command) => {
			program && command.attachCommands(program)
		},
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

	const cli: ICli = {
		installFeatures: async <F extends FeatureCode>(
			options: IInstallFeatureOptions<F>
		) => {
			return featureManager.install(options)
		},

		createSchema: async (options): Promise<GenerationResults> => {
			const isInstalled = await featureManager.isInstalled({
				features: [FeatureCode.Skill],
			})

			if (!isInstalled) {
				throw new SpruceError({
					// @ts-ignore
					code: 'SKILL_NOT_INSTALLED',
				})
			}

			const { destinationDir = 'src/schemas', ...rest } = options
			const resolvedDestination = diskUtil.resolvePath(cwd, destinationDir)

			const results = await generators.schema.generateBuilder(
				resolvedDestination,
				rest
			)

			const syncResults = await cli.syncSchemas({
				lookupDir: destinationDir,
				...rest,
			})

			return [...results, ...syncResults]
		},

		syncSchemas: async (options) => {
			const isInstalled = await featureManager.isInstalled({
				features: [FeatureCode.Skill, FeatureCode.Schema],
			})

			if (!isInstalled) {
				throw new SpruceError({
					// @ts-ignore
					code: 'SKILL_NOT_INSTALLED',
				})
			}

			const {
				lookupDir,
				addonLookupDir,
				destinationDir = diskUtil.resolveHashSprucePath(cwd, 'schemas'),
			} = options ?? {}

			const {
				schemas: { items: schemaTemplateItems },
				fields: { items: fieldTemplateItems },
			} = await stores.schema.fetchAllTemplateItems(lookupDir, addonLookupDir)

			await generators.schema.generateFieldTypes(
				diskUtil.resolvePath(cwd, destinationDir),
				{ fieldTemplateItems }
			)

			const valueTypeResults = await generators.schema.generateValueTypes(
				diskUtil.resolvePath(cwd, destinationDir),
				{
					fieldTemplateItems,
					schemaTemplateItems,
				}
			)

			const valueTypes: IValueTypes = await serviceFactory
				.Service(cwd, Service.Import)
				.importDefault(valueTypeResults[0].path)

			const results = await generators.schema.generateSchemaTypes(
				diskUtil.resolvePath(cwd, destinationDir),
				{
					fieldTemplateItems,
					schemaTemplateItems,
					valueTypes,
				}
			)

			return results
		},

		checkHealth: async (): Promise<IHealthCheckResults> => {
			const isInstalled = await featureManager.isInstalled({
				features: [FeatureCode.Skill],
			})

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
