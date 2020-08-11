import { SchemaValues } from '@sprucelabs/schema'
import upgradeSkillActionSchema from '#spruce/schemas/local/v2020_07_22/upgradeSkillAction.schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { IFeatureActionExecuteResponse } from '../../features.types'

export default class UpgradeAction extends AbstractFeatureAction<
	SpruceSchemas.Local.v2020_07_22.IUpgradeSkillActionSchema
> {
	public name = 'Upgrade'
	public optionsSchema = upgradeSkillActionSchema

	public async execute(
		options: SchemaValues<
			SpruceSchemas.Local.v2020_07_22.IUpgradeSkillActionSchema
		>
	): Promise<IFeatureActionExecuteResponse> {
		const normalizedOptions = this.validateAndNormalizeOptions(options)
		const generatedFiles = await this.copyFiles(normalizedOptions)

		await this.reInstallPackageDependencies()

		return { files: generatedFiles }
	}

	private async reInstallPackageDependencies() {
		this.term.startLoading('Updating dependencies...')
		const feature = this.getFeature('skill')
		await this.featureInstaller.installPackageDependencies(feature)
		this.term.stopLoading()
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
