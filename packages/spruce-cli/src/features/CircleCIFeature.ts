import fs from 'fs-extra'
import path from 'path'
import { TemplateDirectory, TemplateKind } from '@sprucelabs/spruce-templates'
import log from '../lib/log'
import AbstractFeature, { IFeaturePackage } from './AbstractFeature'

export default class CircleCIFeature extends AbstractFeature {
	public featureDependencies = []

	public packages: IFeaturePackage[] = []

	public async beforePackageInstall() {
		await this.writeDirectoryTemplate({
			template: TemplateKind.CircleCI
		})
	}

	public async isInstalled(
		/** The directory to check if a skill is installed. Default is the cwd. */
		dir?: string
	) {
		const cwd = dir ?? this.cwd
		const filesToCheck = await TemplateDirectory.filesInTemplate(
			TemplateKind.CircleCI
		)
		// Check if the .spruce directory exists
		let filesMissing = false
		for (let i = 0; i < filesToCheck.length; i += 1) {
			const file = path.join(cwd, filesToCheck[i])
			if (!fs.existsSync(file)) {
				log.debug(
					`CircleCIFeature isInstalled failed because ${file} is missing`
				)
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
