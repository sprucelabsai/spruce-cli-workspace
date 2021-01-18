import pathUtil from 'path'
import {
	EventContract,
	SpruceSchemas,
} from '@sprucelabs/mercury-types'
import {
	eventContractUtil,
	eventDiskUtil,
	eventResponseUtil,
	eventNameUtil,
	NamedEventSignature
} from '@sprucelabs/spruce-event-utils'
import {
	EventHealthCheckItem,
	EventFeatureListener,
	SkillFeature,
	Skill,
	HASH_SPRUCE_DIR_NAME,
	SettingsService,
	diskUtil,
	HealthCheckItem,
	Log,
} from '@sprucelabs/spruce-skill-utils'
import globby from 'globby'
import SpruceError from '../../errors/SpruceError'

require('dotenv').config()

type MercuryClient<T> = T extends any ? any : any


export class EventSkillFeature implements SkillFeature {
	private skill: Skill
	private listenersPath: string
	private listeners: EventFeatureListener[] = []
	private eventsIRegistered: Required<NamedEventSignature>[] = []
	private allEventSignatures: NamedEventSignature[] = []
	private combinedContractsFile: string
	private _shouldConnectToApi: boolean
	//@ts-ignore
	private apiClient?: any
	private log: Log
	private currentSkill: SpruceSchemas.Spruce.v2020_07_22.Skill | undefined

	public constructor(skill: Skill) {
		this.skill = skill
		this.listenersPath = pathUtil.join(this.skill.activeDir, 'listeners')
		this.combinedContractsFile = pathUtil.join(
			this.skill.activeDir,
			HASH_SPRUCE_DIR_NAME,
			'events',
			'events.contract'
		)
		this._shouldConnectToApi =
			diskUtil.doesFileExist(this.combinedContractsFile + '.ts') ||
			diskUtil.doesFileExist(this.combinedContractsFile + '.js')
		this.log = skill.buildLog('feature.event')
	}

	public async execute() {
		await this.loadEverything()

		const willBoot = this.getListener('skill', 'will-boot')
		const didBoot = this.getListener('skill', 'did-boot')

		if (willBoot) {
			this.log.info(`Emitting skill.willBoot internally`)
			await willBoot(this.skill)
		}

		await this.reRegisterListeners()
		await this.reRegisterEvents()

		if (didBoot) {
			this.log.info(`Emitting skill.didBoot internally`)
			await didBoot(this.skill)
		}

		if (this.apiClient) {
			this.log.info('Connection to Mercury successful. Waiting for events')
			await new Promise((_r) => { })
		} else {
			this.log.info('This skill not registered so I have nothing to do. 🌲🤖')
		}
	}

	public async checkHealth() {
		try {

			await this.loadEverything()

			const health: EventHealthCheckItem = {
				status: 'passed',
				listeners: this.listeners,
				contracts: this.allEventSignatures.map((contract) => ({
					fullyQualifiedEventName:
						contract.fullyQualifiedEventName,
				})),
				events: this.eventsIRegistered.map((e) => ({
					eventName: e.eventName,
					eventNamespace: e.eventNamespace,
					version: e.version,
				})),
			}


			await this.destroy()

			return health
		} catch (err) {

			const health: HealthCheckItem = {
				status: 'failed',
				errors: [
					new SpruceError({
						//@ts-ignore
						code: 'EVENT_PLUGIN_ERROR',
						originalError: err
					}).toObject()
				],
			}

			return health
		}
	}

	private async destroy() {
		if (this.apiClient) {
			this.log.info(`Disconnecting from Mercury.`)
			await this.apiClient.disconnect()
		}
	}

	private async loadEverything() {
		await this.loadListeners()
		await this.loadContracts()
		await this.loadEvents()
	}

	private async connectToApi(): Promise<{
		client?: MercuryClient<any>
		currentSkill?: SpruceSchemas.Spruce.v2020_07_22.Skill
	}> {
		if (!this.shouldConnectToApi()) {
			return { client: undefined, currentSkill: undefined }
		}

		if (this.apiClient) {
			return { client: this.apiClient, currentSkill: this.currentSkill }
		}

		const contracts = require(this.combinedContractsFile).default
		const MercuryClientFactory = require('@sprucelabs/mercury-client')
			.MercuryClientFactory
		const host = process.env.HOST ?? 'https://sandbox.mercury.spruce.ai'

		this.log.info('Connecting to Mercury at', host)
		const client = await MercuryClientFactory.Client({
			host,
			allowSelfSignedCrt: true,
			contracts,
		})

		this.apiClient = client

		this.log.info('Connection successful')

		const skillId = process.env.SKILL_ID
		const apiKey = process.env.SKILL_API_KEY
		let currentSkill: SpruceSchemas.Spruce.v2020_07_22.Skill | undefined

		if (skillId && apiKey) {
			this.log.info('Logging in as skill')

			const results = await client.emit('authenticate::v2020_12_25', {
				payload: {
					skillId,
					apiKey,
				},
			} as any)



			const { auth } = eventResponseUtil.getFirstResponseOrThrow(results)

			currentSkill = auth.skill
			this.currentSkill = currentSkill

			this.log.info('Authentication successful')
		}

		return { client, currentSkill }
	}

	private async reRegisterListeners() {
		if (!this.shouldConnectToApi()) {
			return
		}

		const { client, currentSkill } = await this.connectToApi()

		if (client && currentSkill) {
			await client.emit('unregister-listeners::v2020_12_25', {
				payload: {
					shouldUnRegisterAll: true,
				},
			})

			this.log.info('Unregistered all existing registered listeners')

			await this.registerListeners(client)
		}

		this.apiClient = client
	}

	private async reRegisterEvents() {
		const { client, currentSkill } = await this.connectToApi()

		if (client && currentSkill) {
			await client.emit('unregister-events::v2020_12_25', {
				payload: {
					shouldUnRegisterAll: true,
				},
			})

			this.log.info('Unregistered existing event contracts')

			await this.registerEvents()
		}
	}

	private async registerEvents() {
		const { client } = await this.connectToApi()
		if (client) {
			const contract = {
				eventSignatures: {},
			}

			for (const event of this.eventsIRegistered) {
				const name = eventNameUtil.join({ eventName: event.eventName, version: event.version })
				//@ts-ignore
				contract.eventSignatures[name] =
					event.signature
			}


			const registerResults = await client.emit('register-events::v2020_12_25', { payload: { contract } })

			eventResponseUtil.getFirstResponseOrThrow(registerResults)

			this.log.info(
				`Registered ${this.eventsIRegistered.length} event contract${this.eventsIRegistered.length === 1 ? '' : 's'
				}`
			)
		}
	}

	private async registerListeners(client: any) {
		for (const listener of this.listeners) {
			if (listener.eventNamespace !== 'skill') {
				const name = eventNameUtil.join({
					eventName: listener.eventName,
					eventNamespace: listener.eventNamespace,
					version: listener.version
				})

				await client.on(name, async (...args: []) => {
					this.log.info(`Incoming event - ${name}`)
					try {
						//@ts-ignore
						const results = await listener.callback(...args)

						return results
					} catch (err) {
						return {
							errors: [err],
						}
					}
				})
				this.log.info(`Registered listener for ${name}`)
			}
		}
	}

	private async loadContracts() {
		if (this.shouldConnectToApi()) {
			const contracts = require(this.combinedContractsFile).default

			contracts.forEach((contract: EventContract) => {
				const named = eventContractUtil.getNamedEventSignatures(contract)

				this.allEventSignatures.push(
					...named.map((named) => ({
						fullyQualifiedEventName:
							named.fullyQualifiedEventName,
						eventName: named.eventName,
						eventNamespace: named.eventNamespace,
						signature: named.signature,
						version: named.version
					}))
				)
			})

			return this.allEventSignatures
		}

		return null
	}

	private shouldConnectToApi() {
		return this._shouldConnectToApi
	}

	public async isInstalled() {
		const settingsService = new SettingsService(this.skill.rootDir)
		const isInstalled = settingsService.isMarkedAsInstalled('event')
		return isInstalled
	}

	private getListener(eventNamespace: string, eventName: string) {
		const match = this.listeners.find(
			(listener) =>
				listener.eventNamespace === eventNamespace &&
				listener.eventName === eventName
		)
		if (match) {
			return match.callback
		}

		return undefined
	}

	private async loadListeners() {
		this.log.info('Loading listeners')

		const listenerMatches = await globby(
			`${this.listenersPath}/**/*.listener.[j|t]s`
		)
		const listeners: EventFeatureListener[] = []

		listenerMatches.forEach((match) => {

			const {
				eventName,
				eventNamespace,
				version,
			} = eventDiskUtil.splitPathToListener(match)

			const callback = require(match).default as
				| EventFeatureListener['callback']
				| undefined

			if (!callback || typeof callback !== 'function') {
				throw new Error(
					`The plugin at ${match} is missing a default export that is a function`
				)
			}

			this.log.info(
				`Found listener for ${eventNameUtil.join(
					{
						eventName,
						eventNamespace,
						version
					}
				)}`
			)

			listeners.push({
				eventName,
				eventNamespace,
				version,
				callback,
			})
		})

		this.listeners = listeners
	}

	private async loadEvents() {
		const { currentSkill } = await this.connectToApi()

		if (currentSkill) {
			this.log.info('Loading events')
			this.eventsIRegistered = []

			this.allEventSignatures.forEach((signature) => {
				if (signature.eventNamespace === currentSkill.slug) {
					this.eventsIRegistered.push({
						eventName: signature.eventName,
						eventNamespace: currentSkill.slug,
						version: signature.version ?? '***coming soon***',
						signature: signature.signature,
						fullyQualifiedEventName:
							signature.fullyQualifiedEventName,
					})
				}
			})
		}

		return this.eventsIRegistered
	}
}

export default (skill: Skill) => {
	const feature = new EventSkillFeature(skill)
	skill.registerFeature('event', feature)
}
