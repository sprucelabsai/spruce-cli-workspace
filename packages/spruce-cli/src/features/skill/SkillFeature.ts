import { validateSchemaValues } from '@sprucelabs/schema'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import skillFeatureSchema from '#spruce/schemas/local/v2020_07_22/skillFeature.schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import { INpmPackage } from '../../types/cli.types'
import AbstractFeature from '../AbstractFeature'
import { FeatureCode } from '../features.types'

type SkillFeatureSchema = SpruceSchemas.Local.v2020_07_22.ISkillFeatureSchema
type Skill = SpruceSchemas.Local.v2020_07_22.ISkillFeature

export default class SkillFeature<
	T extends SkillFeatureSchema = SkillFeatureSchema
> extends AbstractFeature<T> {
	public nameReadable = 'Skill'
	public code: FeatureCode = 'skill'
	public description =
		'Skill: The most basic configuration needed to enable a skill'

	public dependencies: FeatureCode[] = []
	public packageDependencies: INpmPackage[] = [
		{ name: 'typescript' },
		{ name: '@sprucelabs/log' },
		{ name: '@sprucelabs/error' },
		{ name: '@sprucelabs/spruce-skill-utils' },
		{ name: '@sprucelabs/babel-plugin-schema', isDev: true },
		{ name: '@types/node', isDev: true },
		{ name: 'ts-node', isDev: true },
		{ name: 'tsconfig-paths', isDev: true },
		{ name: '@babel/cli', isDev: true },
		{ name: '@babel/core', isDev: true },
		{ name: '@babel/plugin-proposal-class-properties', isDev: true },
		{ name: '@babel/plugin-proposal-decorators', isDev: true },
		{ name: '@babel/plugin-transform-runtime', isDev: true },
		{ name: '@babel/preset-env', isDev: true },
		{ name: '@babel/preset-typescript', isDev: true },
		{ name: 'babel-plugin-module-resolver', isDev: true },
		{ name: 'eslint', isDev: true },
		{ name: 'eslint-config-spruce', isDev: true },
		{ name: 'prettier', isDev: true },
		{ name: 'globby' },
	]

	public optionsDefinition = skillFeatureSchema as T
	protected actionsDir = diskUtil.resolvePath(__dirname, 'actions')

	public async beforePackageInstall(options: Skill) {
		await this.install(options)
	}

	private async install(
		options: SpruceSchemas.Local.v2020_07_22.ISkillFeature
	) {
		validateSchemaValues(skillFeatureSchema, options)

		const skillGenerator = this.Generator('skill')
		await skillGenerator.generateSkill(this.cwd, options)
	}

	public async isInstalled() {
		try {
			return (
				diskUtil.doesDirExist(diskUtil.resolvePath(this.cwd, 'node_modules')) &&
				diskUtil.doesDirExist(diskUtil.resolveHashSprucePath(this.cwd))
			)
		} catch {
			return false
		}
	}
}
