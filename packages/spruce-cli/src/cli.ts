import osUtil from 'os'
import { MercuryClientFactory } from '@sprucelabs/mercury-client'
import { MercuryEventEmitter, SpruceSchemas } from '@sprucelabs/mercury-types'
import {
	diskUtil,
	HealthCheckResults,
	HEALTH_DIVIDER,
} from '@sprucelabs/spruce-skill-utils'
import { Command, CommanderStatic } from 'commander'
import './addons/filePrompt.addon'
import eventsContracts, { EventContracts } from '#spruce/events/events.contract'
import SpruceError from './errors/SpruceError'
import FeatureCommandAttacher from './features/FeatureCommandAttacher'
import FeatureInstaller from './features/FeatureInstaller'
import FeatureInstallerFactory from './features/FeatureInstallerFactory'
import { FeatureCode, InstallFeatureOptions } from './features/features.types'
import CliGlobalEmitter, {
	GlobalEmitter,
	GlobalEventContract,
} from './GlobalEmitter'
import TerminalInterface from './interfaces/TerminalInterface'
import ServiceFactory from './services/ServiceFactory'
import log from './singletons/log'
import StoreFactory from './stores/StoreFactory'
import {
	ApiClient,
	ApiClientFactory,
	ApiClientFactoryOptions,
} from './types/apiClient.types'
import { GraphicsInterface } from './types/cli.types'
import apiClientUtil from './utilities/apiClient.utility'

interface HealthOptions {
	isRunningLocally?: boolean
}

export interface CliInterface extends MercuryEventEmitter<GlobalEventContract> {
	installFeatures: FeatureInstaller['install']
	getFeature: FeatureInstaller['getFeature']
	checkHealth(options?: HealthOptions): Promise<HealthCheckResults>
}

export interface CliBootOptions {
	cwd?: string
	homeDir?: string
	program?: CommanderStatic['program']
	graphicsInterface?: GraphicsInterface
	emitter?: GlobalEmitter
	apiClientFactory?: ApiClientFactory
	host?: string
}

export default class Cli implements CliInterface {
	private cwd: string
	private featureInstaller: FeatureInstaller
	private serviceFactory: ServiceFactory
	public readonly emitter: GlobalEmitter
	private static apiClients: Record<string, ApiClient> = {}

	private constructor(
		cwd: string,
		featureInstaller: FeatureInstaller,
		serviceFactory: ServiceFactory,
		emitter: GlobalEmitter
	) {
		this.cwd = cwd
		this.featureInstaller = featureInstaller
		this.serviceFactory = serviceFactory
		this.emitter = emitter
		Cli.apiClients = {}
	}

	public async on(...args: any[]) {
		//@ts-ignore
		return this.emitter.on(...args)
	}

	public async off(...args: any[]) {
		//@ts-ignore
		return this.emitter.off(...args)
	}

	public async emit(...args: any[]) {
		//@ts-ignore
		return this.emitter.emit(...args)
	}

	public async installFeatures(options: InstallFeatureOptions) {
		return this.featureInstaller.install(options)
	}

	public getFeature<C extends FeatureCode>(code: C) {
		return this.featureInstaller.getFeature(code)
	}

	public async checkHealth(
		options?: HealthOptions
	): Promise<HealthCheckResults> {
		const isInstalled = await this.featureInstaller.isInstalled('skill')

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
			const commandService = this.serviceFactory.Service(this.cwd, 'command')
			const command =
				options?.isRunningLocally === false
					? 'yarn health'
					: 'yarn health.local'
			const results = await commandService.execute(command)
			const resultParts = results.stdout.split(HEALTH_DIVIDER)

			return JSON.parse(resultParts[1]) as HealthCheckResults
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
	}

	public static async Boot(options?: CliBootOptions): Promise<CliInterface> {
		const program = options?.program
		const emitter = options?.emitter ?? CliGlobalEmitter.Emitter()

		let cwd = options?.cwd ?? process.cwd()
		const serviceFactory = new ServiceFactory({})
		const apiClientFactory = Cli.buildApiClientFactory(
			cwd,
			serviceFactory,
			options
		)

		const storeFactory = new StoreFactory({
			cwd,
			serviceFactory,
			homeDir: options?.homeDir ?? osUtil.homedir(),
			emitter,
			apiClientFactory,
		})

		const ui = options?.graphicsInterface ?? new TerminalInterface(cwd)

		const featureInstaller = FeatureInstallerFactory.WithAllFeatures({
			cwd,
			serviceFactory,
			storeFactory,
			ui,
			emitter,
			apiClientFactory,
		})

		if (program) {
			const attacher = new FeatureCommandAttacher({
				program,
				featureInstaller,
				ui,
				emitter,
			})
			const codes = FeatureInstallerFactory.featureCodes

			for (const code of codes) {
				const feature = featureInstaller.getFeature(code)
				await attacher.attachFeature(feature)
			}

			program.commands.sort((a: any, b: any) => a._name.localeCompare(b._name))

			program.action((command, args) => {
				throw new SpruceError({ code: 'INVALID_COMMAND', args: args || [] })
			})
		}

		const cli = new Cli(cwd, featureInstaller, serviceFactory, emitter)

		return cli as CliInterface
	}

	public static buildApiClientFactory(
		cwd: string,
		serviceFactory: ServiceFactory,
		bootOptions?: CliBootOptions
	): ApiClientFactory {
		const apiClientFactoryAnon = bootOptions?.apiClientFactory
			? bootOptions.apiClientFactory
			: async (options?: ApiClientFactoryOptions) => {
					const key = apiClientUtil.generateClientCacheKey(options)
					if (!Cli.apiClients[key]) {
						Cli.apiClients[
							key
						] = await MercuryClientFactory.Client<EventContracts>({
							// TODO comment back in when contracts are fixed
							// contracts: eventsContracts,
							host: bootOptions?.host ?? 'https://sandbox.mercury.spruce.ai',
							allowSelfSignedCrt: true,
						})
					}

					return Cli.apiClients[key]
			  }

		const apiClientFactory = async (options?: ApiClientFactoryOptions) => {
			const key = apiClientUtil.generateClientCacheKey(options)

			if (!Cli.apiClients[key]) {
				Cli.apiClients[key] = await apiClientFactoryAnon(options)

				let auth: SpruceSchemas.MercuryApi.AuthenticateEmitPayload = {}
				if (!options) {
					const person = serviceFactory.Service(cwd, 'auth').getLoggedInPerson()

					if (person) {
						auth.token = person.token
					}
				} else if (options.shouldAuthAsCurrentSkill) {
					const skill = serviceFactory.Service(cwd, 'auth').getCurrentSkill()

					if (skill) {
						auth = {
							skillId: skill.id,
							apiKey: skill.apiKey,
						}
					}
				} else if (options.skillId && options.apiKey) {
					auth = {
						skillId: options.skillId,
						apiKey: options.apiKey,
					}
				}

				if (Object.keys(auth).length > 0) {
					await Cli.apiClients[key].emit('authenticate::v2020_12_25', {
						payload: auth,
					})

					//@ts-ignore
					Cli.apiClients[key].auth = auth
				}
			}

			return Cli.apiClients[key]
		}

		return apiClientFactory
	}
}

export async function run(argv: string[] = []): Promise<void> {
	const program = new Command()
	let cwd = process.cwd()

	program.storeOptionsAsProperties(false)
	program.option('--no-color', 'Disable color output in the console')
	program.option(
		'-d, --directory <path>',
		'The working directory to execute the command'
	)

	const dirIdx = process.argv.findIndex((v) => v === '--directory')

	if (dirIdx > -1) {
		const dir = process.argv[dirIdx + 1]
		const newCwd = diskUtil.resolvePath(cwd, dir)
		log.trace(`CWD updated: ${newCwd}`)
		cwd = newCwd
	}

	const terminal = new TerminalInterface(cwd)
	terminal.clear()
	terminal.renderHero('Spruce XP')

	await Cli.Boot({ program, cwd })

	const commandResult = await program.parseAsync(argv)

	if (commandResult.length === 0) {
		program.outputHelp()
	}
}
