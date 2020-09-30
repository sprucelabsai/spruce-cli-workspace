import fs from "fs";
import globby from "globby";
import pathUtil from "path";
import {
	SchemaHealthCheckItem,
	ISkillFeature,
	ISkill,
	diskUtil,
	HASH_SPRUCE_DIR_NAME,
} from "@sprucelabs/spruce-skill-utils";
import { SchemaRegistry } from '@sprucelabs/schema'

class SchemaSkillFeature implements ISkillFeature {
	private skill: ISkill;

	public constructor(skill: ISkill) {
		this.skill = skill;
	}

	public execute = async () => {
		await this.loadSchemas();
	};

	public checkHealth = async () => {
		await this.loadSchemas()

		const schemas = SchemaRegistry.getInstance().getAllSchemas().map(schema =>({
			id: schema.id,
			name: schema.name,
			version: schema.version,
			namespace: schema.namespace ?? '***MISSING***',
			description: schema.description,
		}))
		
		const health: SchemaHealthCheckItem = {
			status: "passed",
			schemas,
		};

		return health;
	};

	public isInstalled = async () => {
		const schemaPath = pathUtil.join(
			this.skill.rootDir,
			"node_modules",
			"@sprucelabs/schema"
		);

		const isSchemaInstalled = fs.existsSync(schemaPath);

		return isSchemaInstalled;
	};

	private async loadSchemas() {
		const schemaFiles = await globby(
			diskUtil.resolvePath(
				this.skill.activeDir,
				HASH_SPRUCE_DIR_NAME,
				"**/*.schema.[t|j]s"
			)
		);

		schemaFiles
			.forEach((file) => require(file));
	}
}

export default (skill: ISkill) => {
	const feature = new SchemaSkillFeature(skill);

	skill.registerFeature("schema", feature);
};
