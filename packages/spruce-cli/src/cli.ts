import osUtil from 'os'
import { MercuryClientFactory } from '@sprucelabs/mercury-client'
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
import CliGlobalEmitter, { GlobalEmitter } from './GlobalEmitter'
import TerminalInterface from './interfaces/TerminalInterface'
import ServiceFactory from './services/ServiceFactory'
import log from './singletons/log'
import { ApiClient, ApiClientFactory } from './stores/AbstractStore'
import StoreFactory from './stores/StoreFactory'
import { GraphicsInterface } from './types/cli.types'

export interface CliInterface {
	installFeatures: FeatureInstaller['install']
	getFeature: FeatureInstaller['getFeature']
	checkHealth(): Promise<HealthCheckResults>
	emitter: GlobalEmitter
}

export interface CliBootOptions {
	cwd?: string
	homeDir?: string
	program?: CommanderStatic['program']
	graphicsInterface?: GraphicsInterface
	emitter?: GlobalEmitter
	apiClientFactory?: ApiClientFactory
}

export default class Cli implements CliInterface {
	private cwd: string
	private featureInstaller: FeatureInstaller
	private serviceFactory: ServiceFactory
	public readonly emitter: GlobalEmitter

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
	}

	public async installFeatures(options: InstallFeatureOptions) {
		return this.featureInstaller.install(options)
	}

	public getFeature<C extends FeatureCode>(code: C) {
		return this.featureInstaller.getFeature(code)
	}

	public async checkHealth(): Promise<HealthCheckResults> {
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
			const results = await commandService.execute('yarn health.local')
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

		let cwd = options?.cwd ?? process.cwd()

		let apiClient: ApiClient | undefined
		const serviceFactory = new ServiceFactory({})
		const storeFactory = new StoreFactory({
			cwd,
			serviceFactory,
			homeDir: options?.homeDir ?? osUtil.homedir(),
			apiClientFactory: options?.apiClientFactory
				? options.apiClientFactory
				: async () => {
						if (!apiClient) {
							apiClient = await MercuryClientFactory.Client<EventContracts>({
								contracts: eventsContracts,
								host: 'https://sandbox.mercury.spruce.ai',
							})
						}

						return apiClient
				  },
		})
		const ui = options?.graphicsInterface ?? new TerminalInterface(cwd)
		const emitter = options?.emitter ?? CliGlobalEmitter.Emitter()

		const featureInstaller = FeatureInstallerFactory.WithAllFeatures({
			cwd,
			serviceFactory,
			storeFactory,
			ui,
			emitter,
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
