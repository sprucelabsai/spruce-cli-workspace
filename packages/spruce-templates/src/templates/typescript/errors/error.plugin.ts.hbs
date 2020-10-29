import globby from "globby";
import {
	ErrorHealthCheckItem,
	ISkillFeature,
	ISkill,
	diskUtil,
	HASH_SPRUCE_DIR_NAME,
} from "@sprucelabs/spruce-skill-utils";

class ErrorSkillFeature implements ISkillFeature {
	private skill: ISkill;

	public constructor(skill: ISkill) {
		this.skill = skill;
	}

	public execute = async () => { };

	public checkHealth = async () => {
		const errorFiles = await this.getErrors()

		const errors = errorFiles.map(path => {
			const schema = require(path).default

			return {
				id: schema.id,
				name: schema.name,
				description: schema.description
			}
		})

		const health: ErrorHealthCheckItem = {
			status: "passed",
			errorSchemas: errors,
		};

		return health;
	};

	public isInstalled = async () => {
		return true
	};

	private async getErrors() {
		const schemaFiles = await globby(
			diskUtil.resolvePath(
				this.skill.activeDir,
				HASH_SPRUCE_DIR_NAME,
				"errors",
				"**/*.schema.[t|j]s"
			)
		);
		return schemaFiles
	}
}

export default (skill: ISkill) => {
	const feature = new ErrorSkillFeature(skill);
	skill.registerFeature("error", feature);
};
