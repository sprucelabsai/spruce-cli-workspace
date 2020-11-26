import pathUtil from "path";
import fs from "fs";
import {
	EventHealthCheckItem,
	EventFeatureListener,
	SkillFeature,
	Skill,
} from "@sprucelabs/spruce-skill-utils";
import globby from "globby";

export class EventSkillFeature implements SkillFeature {
	private skill: Skill;
	private eventsPath: string;
	private listeners: EventFeatureListener[] = [];

	constructor(skill: Skill) {
		this.skill = skill;
		this.eventsPath = pathUtil.join(this.skill.activeDir, "events");
	}

	public execute = async () => {
		await this.loadListeners();

		const willBoot = this.getListener("skill", "will-boot");
		const didBoot = this.getListener("skill", "did-boot");

		if (willBoot) {
			await willBoot(this.skill);
		}

		if (didBoot) {
			await didBoot(this.skill);
		}
	};

	public checkHealth = async () => {
		await this.loadListeners();

		const health: EventHealthCheckItem = {
			status: "passed",
			listeners: this.listeners,
		};

		return health;
	};

	isInstalled = async () => {
		const isInstalled = fs.existsSync(this.eventsPath);
		return isInstalled;
	};

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

export default (skill: Skill) => {
	const feature = new EventSkillFeature(skill);

	skill.registerFeature("event", feature);
};
