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
import CommandService from './services/CommandService'
import ServiceFactory from './services/ServiceFactory'
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

type PromiseCache = Record<string, Promise<ApiClient>>

export default class Cli implements CliInterface {
	private cwd: string
	private featureInstaller: FeatureInstaller
	private serviceFactory: ServiceFactory
	public readonly emitter: GlobalEmitter
	private static apiClients: PromiseCache = {}

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

	public static async resetApiClients() {
		for (const key in this.apiClients) {
			await (await this.apiClients[key]).disconnect()
		}

		this.apiClients = {}
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
		const serviceFactory = new ServiceFactory()
		const apiClientFactory =
			options?.apiClientFactory ??
			Cli.buildApiClientFactory(cwd, serviceFactory, options)

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
			})
			const codes = FeatureInstallerFactory.featureCodes

			for (const code of codes) {
				const feature = featureInstaller.getFeature(code)
				await attacher.attachFeature(feature)
			}

			program.commands.sort((a: any, b: any) => a._name.localeCompare(b._name))

			program.action((_, command) => {
				throw new SpruceError({
					code: 'INVALID_COMMAND',
					args: command.args || [],
				})
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
		const apiClientFactory = async (options?: ApiClientFactoryOptions) => {
			const key = apiClientUtil.generateClientCacheKey(options)

			if (!Cli.apiClients[key]) {
				Cli.apiClients[key] = Cli.connectToApi(
					cwd,
					serviceFactory,
					options,
					bootOptions
				)
			}

			return Cli.apiClients[key]
		}

		return apiClientFactory
	}

	private static async connectToApi(
		cwd: string,
		serviceFactory: ServiceFactory,
		options?: ApiClientFactoryOptions,
		bootOptions?: CliBootOptions
	): Promise<ApiClient> {
		const connect = bootOptions?.apiClientFactory
			? bootOptions.apiClientFactory
			: async () => {
					const client = await MercuryClientFactory.Client<EventContracts>({
						contracts: eventsContracts,
						host: bootOptions?.host ?? 'https://sandbox.mercury.spruce.ai',
						allowSelfSignedCrt: true,
					})

					return client
			  }

		const client = await connect()

		let auth: SpruceSchemas.MercuryApi.v2020_12_25.AuthenticateEmitPayload = {}
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
			await client.authenticate({
				...(auth as any),
			})

			//@ts-ignore
			client.auth = auth
		}

		return client
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
		cwd = newCwd
	}

	const terminal = new TerminalInterface(
		cwd,
		process.env.CLI_RENDER_STACK_TRACES !== 'false'
	)
	terminal.clear()
	terminal.renderHero('Spruce XP')

	await Cli.Boot({
		program,
		cwd,
		host: process.env.HOST,
		graphicsInterface: terminal,
	})

	await setupInGameEntertainment(terminal)

	await program.parseAsync(argv)
}

async function setupInGameEntertainment(terminal: TerminalInterface) {
	let game: any | undefined
	let installMessage = 'Starting install...'
	let killed = false

	if (
		process.stdout.isTTY &&
		process.env.ENABLE_INSTALL_INTERTAINMENT !== 'false'
	) {
		FeatureInstaller.startInstallIntertainmentHandler = (didUpdateHandler) => {
			didUpdateHandler((message) => {
				installMessage = `⏱  ${message}`
			})
			void startGame()
		}

		FeatureInstaller.stopInstallIntertainmentHandler = () => {
			killed = true
			game?.kill()
			terminal.clear()
		}
	}

	async function startGame() {
		terminal.clear()
		await new Promise((r) => setTimeout(r, 500))
		terminal.renderLine(`I have begun installing node modules using NPM.`)
		await new Promise((r) => setTimeout(r, 2000))
		terminal.renderLine(
			`This can be slow, so in the mean time, enjoy some games! 🤩`
		)
		await new Promise((r) => setTimeout(r, 5000))
		terminal.clear()

		game = new CommandService(diskUtil.resolvePath(__dirname, '../'))

		void game.execute('node ./node_modules/.bin/js-tetris-cli', {
			spawnOptions: {
				stdio: [process.stdin, 'pipe', 'pipe'],
			},
			onData: (data: string) => {
				if (!killed) {
					process.stdout?.write(data)
					terminal.saveCursor()
					terminal.moveCursorTo(0, 25)
					process.stdout?.write(installMessage)
					terminal.restoreCursor()
				}
			},
		})

		return game
	}
}
