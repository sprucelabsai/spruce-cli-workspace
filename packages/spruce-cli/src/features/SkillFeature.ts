import fs from 'fs-extra'
import path from 'path'
import os from 'os'
import { TemplateDirectory, TemplateKind } from '@sprucelabs/spruce-templates'
import log from '../lib/log'
import AbstractFeature, { IFeaturePackage, WriteMode } from './AbstractFeature'
import { SchemaDefinitionValues } from '@sprucelabs/schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'

type SkillFeatureType = typeof SpruceSchemas.local.SkillFeature.definition

export default class SkillFeature extends AbstractFeature<SkillFeatureType> {
	public description =
		'Skill: The most basic configuration needed to enable a skill'

	public featureDependencies = []

	public packages: IFeaturePackage[] = [
		{ name: 'typescript' },
		{ name: '@sprucelabs/log' },
		{ name: '@sprucelabs/path-resolver' },
		{ name: '@types/node', isDev: true },
		{ name: '@sprucelabs/test', isDev: true },
		{ name: 'ts-node', isDev: true }
	]

	public optionsSchema = () => SpruceSchemas.local.SkillFeature.definition

	public async beforePackageInstall(options: {
		answers: SchemaDefinitionValues<SkillFeatureType>
	}) {
		await this.writeDirectoryTemplate({
			mode: WriteMode.Skip,
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
