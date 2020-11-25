import fs from 'fs'
import pathUtil from 'path'
import {
	HealthCheckItem,
	SkillFeature,
	Skill,
} from '@sprucelabs/spruce-skill-utils'

class SchemaSkillFeature implements SkillFeature {
	private skill: Skill

	public constructor(skill: Skill) {
		this.skill = skill
	}

	public execute = async () => {}

	public checkHealth = async () => {
		const status: HealthCheckItem['status'] = 'passed'
		return {
			status,
		}
	}

	public isInstalled = async () => {
		const schemaPath = pathUtil.join(
			this.skill.rootDir,
			'node_modules',
			'@sprucelabs/schema'
		)

		const isSchemaInstalled = fs.existsSync(schemaPath)

		return isSchemaInstalled
	}
}

export default (skill: Skill) => {
	const feature = new SchemaSkillFeature(skill)

	skill.registerFeature('schema', feature)
}
