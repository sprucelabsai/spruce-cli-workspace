import { SchemaValues } from '@sprucelabs/schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import upgradeSkillActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/upgradeSkillAction.schema'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'
import SkillFeature from '../SkillFeature'

export default class UpgradeAction extends AbstractFeatureAction<SpruceSchemas.SpruceCli.v2020_07_22.UpgradeSkillActionSchema> {
	public name = 'Upgrade'
	public optionsSchema = upgradeSkillActionSchema

	public async execute(
		options: SchemaValues<SpruceSchemas.SpruceCli.v2020_07_22.UpgradeSkillActionSchema>
	): Promise<FeatureActionResponse> {
		const normalizedOptions = this.validateAndNormalizeOptions(options)
		const generatedFiles = await this.copyFiles(normalizedOptions)

		await this.reInstallPackageDependencies()
		const skillFeature = this.getFeature('skill') as SkillFeature
		skillFeature.installScripts()

		return { files: generatedFiles }
	}

	private async reInstallPackageDependencies() {
		this.ui.startLoading('Updating dependencies...')
		const feature = this.getFeature('skill')
		await this.featureInstaller.installPackageDependencies(feature)
		this.ui.stopLoading()
	}

	private async copyFiles(normalizedOptions: { force?: boolean | undefined }) {
		const skillGenerator = this.Generator('skill', {
			askBeforeUpdating: !normalizedOptions.force,
		})
		const pkgService = this.Service('pkg')
		const name = pkgService.get('name')
		const description = pkgService.get('description')

		const generatedFiles = await skillGenerator.generateSkill(this.cwd, {
			name,
			description,
			upgrade: true,
		})
		return generatedFiles
	}
}
