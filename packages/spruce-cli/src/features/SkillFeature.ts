import fs from 'fs-extra'
import path from 'path'
import os from 'os'
import { TemplateDirectory, TemplateKind } from '@sprucelabs/spruce-templates'
import skillFeatures from '../schemas/skillFeature.definition'
import log from '../lib/log'
import AbstractFeature, {
	IFeaturePackage,
	WriteDirectoryMode
} from './AbstractFeature'
import { SchemaDefinitionValues } from '@sprucelabs/schema'
import { Feature } from '../../.spruce/autoloaders/features'

type SkillFeatures = typeof skillFeatures
export default class SkillFeature extends AbstractFeature<SkillFeatures> {
	public optionsSchema = skillFeatures

	public featureDependencies = [Feature.Schema]

	public packages: IFeaturePackage[] = [
		{ name: 'typescript' },
		{ name: '@sprucelabs/log' },
		{ name: '@sprucelabs/path-resolver' },
		{ name: '@types/node', isDev: true },
		{ name: '@sprucelabs/test', isDev: true },
		{ name: 'ts-node', isDev: true }
	]

	public async beforePackageInstall(options: {
		answers: SchemaDefinitionValues<SkillFeatures>
	}) {
		await this.writeDirectoryTemplate({
			mode: WriteDirectoryMode.Skip,
			template: TemplateKind.Skill,
			templateData: options.answers
		})
	}

	public async isInstalled(
		/** The directory to check if a skill is installed. Default is the cwd. */
		dir?: string
	) {
		const cwd = dir ?? this.cwd
		const filesToCheck = await TemplateDirectory.filesInTemplate(
			TemplateKind.Skill
		)
		// Check if the .spruce directory exists
		const homedir = os.homedir()
		const homeSpruceDir = path.join(homedir, '.spruce')
		log.trace({ cwd: this.cwd })
		const spruceDir = path.join(cwd, '.spruce')
		if (homeSpruceDir !== spruceDir && fs.existsSync(spruceDir)) {
			let filesMissing = false
			for (let i = 0; i < filesToCheck.length; i += 1) {
				const file = path.join(cwd, filesToCheck[i])
				if (!fs.existsSync(file)) {
					log.debug(
						`SkillFeature isInstalled failed because ${file} is missing`
					)
					filesMissing = true
					break
				}
			}

			if (!filesMissing) {
				return true
			}
		}

		return false
	}
}
