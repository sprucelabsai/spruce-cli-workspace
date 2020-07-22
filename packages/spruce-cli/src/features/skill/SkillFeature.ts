import { validateSchemaValues } from '@sprucelabs/schema'
import { DirectoryTemplateKind } from '@sprucelabs/spruce-templates'
import skillFeatureDefinition from '#spruce/schemas/local/skillFeature.definition'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import { INpmPackage } from '../../types/cli.types'
import diskUtil from '../../utilities/disk.utility'
import namesUtil from '../../utilities/names.utility'
import tsConfigUtil from '../../utilities/tsConfig.utility'
import AbstractFeature from '../AbstractFeature'
import { FeatureCode } from '../features.types'

type SkillFeatureDefinition = SpruceSchemas.Local.SkillFeature.IDefinition
type Skill = SpruceSchemas.Local.ISkillFeature

export default class SkillFeature<
	T extends SkillFeatureDefinition = SkillFeatureDefinition
> extends AbstractFeature<T> {
	public description =
		'Skill: The most basic configuration needed to enable a skill'

	public code: FeatureCode = 'skill'
	public dependencies: FeatureCode[] = []
	public packageDependencies: INpmPackage[] = [
		{ name: 'typescript' },
		{ name: '@sprucelabs/log' },
		{ name: '@types/node', isDev: true },
		{ name: 'ts-node', isDev: true },
		{ name: 'tsconfig-paths', isDev: true },
	]

	public optionsDefinition = skillFeatureDefinition as T
	protected actionsDir = diskUtil.resolvePath(__dirname, 'actions')

	public async beforePackageInstall(options: Skill) {
		await this.install(options)
	}

	public async afterPackageInstall() {
		if (!tsConfigUtil.isPathAliasSet(this.cwd, '#spruce/*')) {
			tsConfigUtil.setPathAlias(this.cwd, '#spruce/*', ['.spruce/*'])
		}
	}

	public getActions() {
		return []
	}

	private async install(options: SpruceSchemas.Local.ISkillFeature) {
		validateSchemaValues(skillFeatureDefinition, options)

		const files = await this.templates.directoryTemplate({
			kind: DirectoryTemplateKind.Skill,
			context: {
				...options,
				name: namesUtil.toCamel(options.name),
			},
		})

		await diskUtil.createManyFiles(this.cwd, files)
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
