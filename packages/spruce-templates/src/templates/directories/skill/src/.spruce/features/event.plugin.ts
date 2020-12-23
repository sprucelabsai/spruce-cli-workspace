import pathUtil from "path";
import {
	EventHealthCheckItem,
	EventFeatureListener,
	EventFeatureEvent,
	SkillFeature,
	Skill,
	HASH_SPRUCE_DIR_NAME,
	SettingsService,
	diskUtil,
	HealthCheckItem,
	Log,
} from "@sprucelabs/spruce-skill-utils";
import globby from "globby";
import { EventContract, EventSignature } from "@sprucelabs/mercury-types";
import { eventContractUtil } from '@sprucelabs/spruce-event-utils'

require('dotenv').config()

type Event = (EventFeatureEvent & {
	signature: EventSignature;
});

export class EventSkillFeature implements SkillFeature {

	private skill: Skill;
	private eventsPath: string;
	private listenersPath: string;
	private listeners: EventFeatureListener[] = [];
	private events: Event[] = [];
	private contracts: { eventNameWithOptionalNamespace: string }[] = []
	private combinedContractsFile: string
	private _shouldConnectToApi: boolean
	//@ts-ignore
	private apiClient?: any
	private log: Log;

	constructor(skill: Skill) {
		this.skill = skill;
		this.eventsPath = pathUtil.join(this.skill.activeDir, "events");
		this.listenersPath = pathUtil.join(this.skill.activeDir, "listeners");
		this.combinedContractsFile = pathUtil.join(this.skill.activeDir, HASH_SPRUCE_DIR_NAME, 'events', 'events.contract');
		this._shouldConnectToApi = diskUtil.doesFileExist(this.combinedContractsFile + '.ts') || diskUtil.doesFileExist(this.combinedContractsFile + '.js')
		this.log = skill.buildLog('feature.event')
	}

	public async execute() {
		await this.loadListeners();
		await this.loadEvents()

		const willBoot = this.getListener("skill", "will-boot");
		const didBoot = this.getListener("skill", "did-boot");

		if (willBoot) {
			this.log.info(`Emitting skill.willBoot internally`)
			await willBoot(this.skill);
		}

		if (this.shouldConnectToApi()) {
			await this.connectToApiAndRegisterListeners()
		}

		if (didBoot) {
			this.log.info(`Emitting skill.didBoot internally`)
			await didBoot(this.skill);
		}

		if (this.apiClient) {
			this.log.info('Connection to Mercury successful. Waiting for events')
			await new Promise(_r => { })
		} else {
			this.log.info('This skill not registered so I have nothing to do. 🌲🤖')
		}

		
	}

	private async connectToApiAndRegisterListeners() {
		const contracts = require('#spruce/events/events.contract').default
		const MercuryClientFactory = require('@sprucelabs/mercury-client').MercuryClientFactory
		const host = 'https://sandbox.mercury.spruce.ai'

		this.log.info('Connecting to Mercury at', host)
		const client = await MercuryClientFactory.Client({
			host,
			allowSelfSignedCrt: true,
			contracts
		})

		this.log.info('Connection successful')

		const skillId = process.env.SKILL_ID
		const apiKey = process.env.SKILL_API_KEY

		if (skillId && apiKey) {

			this.log.info('Logging in as skill')

			await client.emit('authenticate', {
				payload: {
					skillId,
					apiKey
				}
			} as any)

			this.log.info('Authentication successful')

			await client.emit('un-register-listeners', {
				payload: {
					shouldUnRegisterAll: true
				}
			})

			this.log.info('Un-registered all existing registered listeners')

			await this.registerListeners(client);

			this.log.info('Registered all listeners')

			await client.emit('un-register-events', {

				payload: {
					shouldUnRegisterAll: true
				}
			})


			this.log.info('Un-registered all existing registered event')

			await this.registerEvents(client)

			this.log.info('Registered all events')
		}

		this.apiClient = client
	}

	private async registerEvents(client: any) {
		for (const event of this.events) {
			console.log(event)
		}
	}

	private async registerListeners(client: any) {
		for (const listener of this.listeners) {
			if (listener.eventNamespace !== 'skill') {
				const name = eventContractUtil.joinEventNameWithOptionalNamespace({
					eventName: listener.eventName,
					eventNamespace: listener.eventNamespace
				});

				await client.on(name, async (...args: []) => {

					this.log.info(`Incoming event - ${name}`);
					try {
						//@ts-ignore
						const results = await listener.callback(...args);
						return results;

					} catch (err) {
						return {
							errors: [err]
						};
					}
				});
				this.log.info(`Registered listener for ${name}`);

			}
		}
	}

	public async checkHealth() {

		try {
			await this.loadListeners();
			await this.loadContracts()
			await this.loadEvents()

			const health: EventHealthCheckItem = {
				status: "passed",
				listeners: this.listeners,
				contracts: this.contracts,
				events: this.events.map(e => ({
					eventName: e.eventName,
					eventNamespace: e.eventNamespace,
					version: e.version
				}))
			}

			return health;

		} catch (err) {

			const health: HealthCheckItem = {
				status: "failed",
				errors: [err]
			}

			return health;
		}
	}



	private async loadContracts() {
		if (this.shouldConnectToApi()) {
			const contracts = require(this.combinedContractsFile).default

			contracts.forEach((contract: EventContract) => {
				const names = eventContractUtil.getEventNames(contract)
				this.contracts.push(...names.map(name => ({ eventNameWithOptionalNamespace: name })))
			})
		}

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
		);
		if (match) {
			return match.callback;
		}

		return undefined;
	}

	private async loadListeners() {

		this.log.info('Loading listeners')

		const listenerMatches = await globby(
			`${this.listenersPath}/**/*.listener.[j|t]s`
		);
		const listeners: EventFeatureListener[] = [];

		listenerMatches.map((match) => {
			debugger
			const { eventName, eventNamespace, version, name } = this.splitPathToEvent(match);

			const callback = require(match).default as
				| EventFeatureListener["callback"]
				| undefined;

			if (!callback || typeof callback !== "function") {
				throw new Error(
					`The plugin at ${match} is missing a default export that is a function`
				);
			}

			this.log.info(`Found listener for ${name}`)

			listeners.push({
				eventName,
				eventNamespace,
				version,
				callback,
			});
		});

		this.listeners = listeners;
	}

	private async loadEvents() {
		this.log.info('Loading events')

		this.events = []
		const fileMatches = await globby(
			`${this.eventsPath}/**/*`
		);

		const eventsByName: Record<string, Event> = {}

		for (const match of fileMatches) {
			
			const { eventName, eventNamespace, version, name } = this.splitPathToEvent(match)
			const filename = pathUtil.basename(match)

			let key: string | undefined= ``

			switch (filename) {
				case 'emitPayload.builder.ts':
					key = 'emitPayloadSchema'
					break
				case 'responsePayload.builder.ts':
					key = 'responsePayloadSchema'
					break
				case 'emitPermissions.builder.ts':
					key = 'listenPermissionContract'
					break
				case 'responsePermissions.builder.ts':
					key = 'emitPermissionContract'
					break
			}

			if (key) {
				const value = require(match).default
	
				eventsByName[name] = { 
					...(eventsByName[name] ?? {}), 
					eventName, 
					eventNamespace, 
					version,
					[key]: value 
				}
			}

		}

		for (const eventName in eventsByName) {
			const event = eventsByName[eventName]
			this.events.push(event)
		}
		
	}

	private splitPathToEvent(match: string) {
		const matchParts = pathUtil.dirname(match).split(pathUtil.sep);
		const filename = matchParts.pop() as string;

		const eventName = filename.split(".")[0] as string;
		const eventNamespace = matchParts.pop() as string;
		const version = matchParts.pop() as string;
		const name = eventContractUtil.joinEventNameWithOptionalNamespace({
			eventName: eventName,
			eventNamespace: eventNamespace
		})
		return { eventName, eventNamespace, version, name };
	}
}

export default (skill: Skill) => {
	const feature = new EventSkillFeature(skill);

	skill.registerFeature("event", feature);
}
