import pathUtil from "path";
import {
	EventHealthCheckItem,
	EventFeatureListener,
	SkillFeature,
	Skill as contractsFile,
	HASH_SPRUCE_DIR_NAME,
	SettingsService,
	diskUtil,
	HealthCheckItem,
} from "@sprucelabs/spruce-skill-utils";
import globby from "globby";
import { EventContract, eventContractUtil } from "@sprucelabs/mercury-types";

export class EventSkillFeature implements SkillFeature {

	private skill: contractsFile;
	private eventsPath: string;
	private listeners: EventFeatureListener[] = [];
	private contracts: { eventNameWithOptionalNamespace: string }[] = []
	private combinedContractsFile: string

	constructor(skill: contractsFile) {
		this.skill = skill;
		this.eventsPath = pathUtil.join(this.skill.activeDir, "events");
		this.combinedContractsFile = pathUtil.join(this.skill.activeDir, HASH_SPRUCE_DIR_NAME, 'events', 'events.contract');
	}

	public async execute() {
		await this.loadListeners();

		const willBoot = this.getListener("skill", "will-boot");
		const didBoot = this.getListener("skill", "did-boot");

		if (willBoot) {
			await willBoot(this.skill);
		}

		if (didBoot) {
			await didBoot(this.skill);
		}
	}

	public async checkHealth() {

		try {
			await this.loadListeners();
			await this.loadContracts()

			const health: EventHealthCheckItem = {
				status: "passed",
				listeners: this.listeners,
				contracts: this.contracts
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
		if (diskUtil.doesFileExist(this.combinedContractsFile + '.ts') || diskUtil.doesFileExist(this.combinedContractsFile + '.js')) {
			const contracts = require(this.combinedContractsFile).default

			contracts.forEach((contract: EventContract) => {
				const names = eventContractUtil.getEventNames(contract)
				this.contracts.push(...names.map(name => ({ eventNameWithOptionalNamespace: name })))
			})
		}

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
		const listenerMatches = await globby(
			`${this.eventsPath}/**/*.listener.[j|t]s`
		);
		const listeners: EventFeatureListener[] = [];

		listenerMatches.map((match) => {
			const matchParts = match.split(pathUtil.sep);
			const fileName = matchParts.pop() as string;

			const eventName = fileName.split(".")[0] as string;
			const eventNamespace = matchParts.pop() as string;
			const version = matchParts.pop() as string;
			const callback = require(match).default as
				| EventFeatureListener["callback"]
				| undefined;

			if (!callback || typeof callback !== "function") {
				throw new Error(
					`The plugin at ${match} is missing a default export that is a function`
				);
			}

			listeners.push({
				eventName,
				eventNamespace,
				version,
				callback,
			});
		});

		this.listeners = listeners;
	}
}

export default (skill: contractsFile) => {
	const feature = new EventSkillFeature(skill);

	skill.registerFeature("event", feature);
}
