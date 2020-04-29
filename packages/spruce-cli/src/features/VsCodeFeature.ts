import fs from 'fs-extra'
import path from 'path'
import { TemplateDirectory, TemplateKind } from '@sprucelabs/spruce-templates'
import log from '../lib/log'
import AbstractFeature, {
	IFeaturePackage,
	WriteDirectoryMode
} from './AbstractFeature'
import { Feature } from '../../.spruce/autoloaders/features'

export default class VSCodeFeature extends AbstractFeature {
	public featureDependencies = [Feature.Skill]

	public packages: IFeaturePackage[] = []

	public async beforePackageInstall() {
		await this.writeDirectoryTemplate({
			mode: WriteDirectoryMode.Overwrite,
			template: TemplateKind.Skill
		})
	}

	public async isInstalled(
		/** The directory to check if a skill is installed. Default is the cwd. */
		dir?: string
	) {
		const cwd = dir ?? this.cwd
		const filesToCheck = await TemplateDirectory.filesInTemplate(
			TemplateKind.VSCode
		)
		// Check if the .spruce directory exists
		let filesMissing = false
		for (let i = 0; i < filesToCheck.length; i += 1) {
			const file = path.join(cwd, filesToCheck[i])
			if (!fs.existsSync(file)) {
				log.debug(`VSCodeFeature isInstalled failed because ${file} is missing`)
				filesMissing = true
				break
			}
		}

		if (!filesMissing) {
			return true
		}

		return false
	}
}
