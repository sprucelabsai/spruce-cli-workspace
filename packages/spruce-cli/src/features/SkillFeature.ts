import fs from 'fs-extra'
import path from 'path'
import os from 'os'
import { TemplateDirectory, TemplateKind } from '@sprucelabs/spruce-templates'
import log from '../lib/log'
import AbstractFeature, {
	IFeaturePackage,
	WriteDirectoryMode
} from './AbstractFeature'

export default class SkillFeature extends AbstractFeature {
	public featureDependencies = []

	public packages: IFeaturePackage[] = [
		{ name: 'typescript' },
		{ name: '@sprucelabs/log' },
		{ name: '@sprucelabs/path-resolver' },
		{ name: '@types/node', isDev: true },
		{ name: '@sprucelabs/test', isDev: true },
		{ name: 'ts-node', isDev: true }
	]

	public async beforePackageInstall() {
		await this.writeDirectoryTemplate({
			mode: WriteDirectoryMode.Overwrite,
			template: TemplateKind.Skill
		})
	}

	// public async afterPackageInstall() {}

	public async isInstalled(
		/** The directory to check if a skill is installed. Default is the cwd. */
		dir?: string
	) {
		const filesToCheck = await TemplateDirectory.filesInTemplate(
			TemplateKind.Skill
		)
		// Check if the .spruce directory exists
		const homedir = os.homedir()
		const homeSpruceDir = path.join(homedir, '.spruce')
		const spruceDir = path.join(`${dir ?? this.cwd}`, '.spruce')
		log.debug({ spruceDir, dir, cwd: this.cwd })
		if (homeSpruceDir !== spruceDir && fs.existsSync(spruceDir)) {
			let filesMissing = false
			for (let i = 0; i < filesToCheck.length; i += 1) {
				const file = path.join(this.cwd, filesToCheck[i])
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
