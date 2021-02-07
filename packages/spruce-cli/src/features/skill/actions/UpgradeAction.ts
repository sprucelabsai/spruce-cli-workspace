import { SchemaValues } from '@sprucelabs/schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import upgradeSkillActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/upgradeSkillOptions.schema'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'
import SkillFeature from '../SkillFeature'

type OptionsSchema = SpruceSchemas.SpruceCli.v2020_07_22.UpgradeSkillOptionsSchema
type Options = SchemaValues<OptionsSchema>

export default class UpgradeAction extends AbstractFeatureAction<OptionsSchema> {
	public code = 'upgrade'
	public optionsSchema = upgradeSkillActionSchema
	public commandAliases = ['upgrade', 'update']

	public async execute(options: Options): Promise<FeatureActionResponse> {
		const normalizedOptions = this.validateAndNormalizeOptions(options)
		const generatedFiles = await this.copyFiles(normalizedOptions)

		await this.reInstallPackageDependencies()
		const skillFeature = this.parent as SkillFeature
		skillFeature.installScripts()

		const results = { files: generatedFiles }

		await this.emitter.emit('skill.did-upgrade')

		return results
	}

	private async reInstallPackageDependencies() {
		this.ui.startLoading('Updating dependencies...')
		const features = await this.featureInstaller.getInstalledFeatures()

		await this.featureInstaller.installPackageDependenciesForManyFeatures(
			features,
			(message: string) => {
				this.ui.startLoading(message)
			}
		)

		this.ui.stopLoading()
	}

	private async copyFiles(normalizedOptions: Options) {
		const skillWriter = this.Writer('skill', {
			upgradeMode: normalizedOptions.upgradeMode,
		})
		const pkgService = this.Service('pkg')
		const name = pkgService.get('name')
		const description = pkgService.get('description')

		const generatedFiles = await skillWriter.writeSkill(this.cwd, {
			name,
			description,
		})
		return generatedFiles
	}
}
