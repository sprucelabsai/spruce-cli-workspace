import fs from 'fs-extra'
import path from 'path'
import os from 'os'
import { TemplateKind } from '@sprucelabs/spruce-templates'
import log from '../lib/log'
import AbstractFeature, { IFeaturePackage } from './AbstractFeature'

export default class SkillFeature extends AbstractFeature {
	public featureDependencies = []

	public packages: IFeaturePackage[] = [
		{ name: 'typescript' },
		{ name: '@sprucelabs/log' },
		{ name: '@sprucelabs/test', isDev: true },
		{ name: 'ts-node', isDev: true }
	]

	public async beforePackageInstall() {
		await this.writeDirectoryTemplate({
			template: TemplateKind.Skill
		})
	}

	// public async afterPackageInstall() {}

	public async isInstalled(
		/** The directory to check if a skill is installed. Default is the cwd. */
		dir?: string
	) {
		// Check if the .spruce directory exists
		const homedir = os.homedir()
		const homeSpruceDir = path.join(homedir, '.spruce')
		const spruceDir = path.join(`${dir ?? this.cwd}`, '.spruce')
		log.debug({ spruceDir, dir, cwd: this.cwd })
		if (homeSpruceDir !== spruceDir && fs.existsSync(spruceDir)) {
			return true
		}

		return false
	}
}
