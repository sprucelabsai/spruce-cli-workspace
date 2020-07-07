import { SchemaDefinitionValues } from '@sprucelabs/schema'
import { DirectoryTemplateKind } from '@sprucelabs/spruce-templates'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import { WriteMode } from '../types/cli.types'
import AbstractFeature, { IFeaturePackage } from './AbstractFeature'

type SkillFeatureType = typeof SpruceSchemas.Local.SkillFeature.definition

export default class SkillFeature extends AbstractFeature<SkillFeatureType> {
	public description =
		'Skill: The most basic configuration needed to enable a skill'

	public featureDependencies = []

	public packages: IFeaturePackage[] = [
		{ name: 'typescript' },
		{ name: '@sprucelabs/log' },
		{ name: '@sprucelabs/path-resolver' },
		{ name: '@types/node', isDev: true },
		{ name: 'ts-node', isDev: true }
	]

	public optionsSchema = () => SpruceSchemas.Local.SkillFeature.definition

	public async beforePackageInstall(options: {
		answers: SchemaDefinitionValues<SkillFeatureType>
	}) {
		await this.writeDirectoryTemplate({
			mode: WriteMode.Skip,
			kind: DirectoryTemplateKind.Skill,
			context: options.answers
		})
	}

	public async afterPackageInstall() {
		// 	this.services.pkg.set({
		// 		path: 'scripts.build',
		// 		value: 'npm run build:node'
		// 	})
		// 	this.services.pkg.set({
		// 		path: 'scripts.build:node',
		// 		value: 'npm run build:node'
		// 	})
		this.services.pkg.set({
			path: 'scripts.clean',
			value: 'rm -rf build/ && rm -rf node_modules/'
		})
	}

	public async isInstalled(
		/** The directory to check if a skill is installed. Default is the cwd. */
		dir?: string
	) {
		return this.templates.isValidTemplatedDirectory({
			kind: DirectoryTemplateKind.Skill,
			dir: dir || this.cwd
		})
	}
}
