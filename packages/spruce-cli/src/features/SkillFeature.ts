import os from 'os'
import path from 'path'
import { SchemaDefinitionValues } from '@sprucelabs/schema'
import { TemplateDirectory, TemplateKind } from '@sprucelabs/spruce-templates'
import fs from 'fs-extra'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import log from '../lib/log'
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
			template: TemplateKind.Skill,
			templateData: options.answers
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
		const cwd = dir ?? this.cwd
		const filesToCheck = await TemplateDirectory.filesInTemplate(
			TemplateKind.Skill
		)
		// Check if the .spruce directory exists
		const homedir = os.homedir()
		const homeSpruceDir = path.join(homedir, '.spruce')
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
