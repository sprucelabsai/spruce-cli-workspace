// import { SchemaDefinitionValues } from '@sprucelabs/schema'
import skillFeatureDefinition from '#spruce/schemas/local/skillFeature.definition'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
// import { WriteMode } from '../types/cli.types'
import { INpmPackage } from '../types/cli.types'
import AbstractFeature from './AbstractFeature'

type SkillFeatureDefinition = SpruceSchemas.Local.SkillFeature.IDefinition

export default class SkillFeature extends AbstractFeature<
	SkillFeatureDefinition
> {
	public description =
		'Skill: The most basic configuration needed to enable a skill'

	public featureDependencies = []

	public packageDependencies: INpmPackage[] = [
		{ name: 'typescript' },
		{ name: '@sprucelabs/log' },
		{ name: '@sprucelabs/path-resolver' },
		{ name: '@types/node', isDev: true },
		{ name: 'ts-node', isDev: true }
	]

	public optionsDefinition = skillFeatureDefinition

	// public async beforePackageInstall(options) {
	// 	await this.writeDirectoryTemplate({
	// 		mode: WriteMode.Skip,
	// 		kind: DirectoryTemplateKind.Skill,
	// 		context: options.answers
	// 	})
	// }

	// public async afterPackageInstall() {
	// 	// 	this.services.pkg.set({
	// 	// 		path: 'scripts.build',
	// 	// 		value: 'npm run build:node'
	// 	// 	})
	// 	// 	this.services.pkg.set({
	// 	// 		path: 'scripts.build:node',
	// 	// 		value: 'npm run build:node'
	// 	// 	})
	// 	// this.services.pkg.set({
	// 	// 	path: 'scripts.clean',
	// 	// 	value: 'rm -rf build/ && rm -rf node_modules/'
	// 	// })
	// }

	public async isInstalled() {
		return true
		// return this.templates.isValidTemplatedDirectory({
		// 	kind: DirectoryTemplateKind.Skill,
		// 	dir: dir || this.cwd
		// })
	}
}
