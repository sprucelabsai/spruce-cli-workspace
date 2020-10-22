import {
	Mercury,
	IMercuryConnectOptions,
	MercuryAuth,
} from '@sprucelabs/mercury'
import {
	diskUtil,
	HealthCheckResults,
	HEALTH_DIVIDER,
} from '@sprucelabs/spruce-skill-utils'
import { Command, CommanderStatic } from 'commander'
import './addons/filePrompt.addon'
import SpruceError from './errors/SpruceError'
import FeatureCommandAttacher from './features/FeatureCommandAttacher'
import FeatureInstaller from './features/FeatureInstaller'
import FeatureInstallerFactory from './features/FeatureInstallerFactory'
import { FeatureCode, IInstallFeatureOptions } from './features/features.types'
import CliGlobalEmitter, { GlobalEmitter } from './GlobalEmitter'
import TerminalInterface from './interfaces/TerminalInterface'
import ServiceFactory from './services/ServiceFactory'
import log from './singletons/log'
import StoreFactory from './stores/StoreFactory'
import { AuthedAs, IGraphicsInterface } from './types/cli.types'

export interface ICli {
	installFeatures: FeatureInstaller['install']
	getFeature: FeatureInstaller['getFeature']
	checkHealth(): Promise<HealthCheckResults>
	emitter: GlobalEmitter
}

export interface ICliBootOptions {
	cwd?: string
	program?: CommanderStatic['program']
	graphicsInterface?: IGraphicsInterface
}

async function login(storeFactory: StoreFactory, mercury: Mercury) {
	const remoteStore = storeFactory.Store('remote')
	const remoteUrl = remoteStore.getRemoteUrl()

	const userStore = storeFactory.Store('user')
	const loggedInUser = userStore.getLoggedInUser()
	const skillStore = storeFactory.Store('skill')
	const loggedInSkill = skillStore.getLoggedInSkill()

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

	const connectOptions: IMercuryConnectOptions = {
		spruceApiUrl: remoteUrl,
		credentials: creds,
	}

	await mercury.connect(connectOptions)
}

export default class Cli implements ICli {
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

	public async installFeatures(options: IInstallFeatureOptions) {
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

	public static async Boot(options?: ICliBootOptions): Promise<ICli> {
		const program = options?.program

		let cwd = options?.cwd ?? process.cwd()

		const mercury = new Mercury()
		const serviceFactory = new ServiceFactory({ mercury })
		const storeFactory = new StoreFactory(cwd, mercury, serviceFactory)
		const terminal = options?.graphicsInterface ?? new TerminalInterface(cwd)
		const emitter = CliGlobalEmitter.Emitter()

		const featureInstaller = FeatureInstallerFactory.WithAllFeatures({
			cwd,
			serviceFactory,
			storeFactory,
			term: terminal,
			emitter,
		})

		if (program) {
			const attacher = new FeatureCommandAttacher(
				program,
				featureInstaller,
				terminal
			)
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

		const isInstalled = await featureInstaller.isInstalled('skill')

		if (isInstalled) {
			await login(storeFactory, mercury)
		}

		const cli = new Cli(cwd, featureInstaller, serviceFactory, emitter)

		return cli as ICli
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

	// program.parse(process.argv)
	const dirIdx = process.argv.findIndex((v) => v === '--directory')

	if (dirIdx > -1) {
		const dir = process.argv[dirIdx + 1]
		const newCwd = diskUtil.resolvePath(cwd, dir)
		log.trace(`CWD updated: ${newCwd}`)
		cwd = newCwd
	}

	const terminal = new TerminalInterface(cwd)
	terminal.renderHero('Spruce XP')

	await Cli.Boot({ program, cwd })

	const commandResult = await program.parseAsync(argv)

	if (commandResult.length === 0) {
		program.outputHelp()
	}
}
