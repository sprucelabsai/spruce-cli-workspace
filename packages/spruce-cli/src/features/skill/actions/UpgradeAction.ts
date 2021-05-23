import { SchemaValues } from '@sprucelabs/schema'
import { eventResponseUtil } from '@sprucelabs/spruce-event-utils'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import upgradeSkillActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/upgradeSkillOptions.schema'
import SpruceError from '../../../errors/SpruceError'
import mergeUtil from '../../../utilities/merge.utility'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'
import SkillFeature from '../SkillFeature'

type OptionsSchema =
	SpruceSchemas.SpruceCli.v2020_07_22.UpgradeSkillOptionsSchema
type Options = SchemaValues<OptionsSchema>

export default class UpgradeAction extends AbstractFeatureAction<OptionsSchema> {
	public code = 'upgrade'
	public optionsSchema = upgradeSkillActionSchema
	public commandAliases = ['upgrade', 'update']

	public async execute(options: Options): Promise<FeatureActionResponse> {
		const normalizedOptions = this.validateAndNormalizeOptions(options)
		const generatedFiles = await this.copyFiles(normalizedOptions)

		await this.reInstallPackageDependencies()
		await this.updateScripts({
			shouldConfirm: normalizedOptions.upgradeMode !== 'forceEverything',
		})

		let results = { files: generatedFiles }

		const response = await this.emitter.emit('skill.did-upgrade')
		const { payloads } = eventResponseUtil.getAllResponsePayloadsAndErrors(
			response,
			SpruceError
		)

		for (const p of payloads) {
			results = mergeUtil.mergeActionResults(results, p)
		}

		return results
	}

	private async updateScripts(options: { shouldConfirm: boolean }) {
		const skillFeature = this.parent as SkillFeature
		await skillFeature.installScripts(this.cwd, {
			shouldConfirmIfScriptExistsButIsDifferent: options.shouldConfirm,
		})
	}

	private async reInstallPackageDependencies() {
		const features = await this.featureInstaller.getInstalledFeatures()

		await this.featureInstaller.installPackageDependenciesForFeatures(
			features,
			(message: string) => {
				this.ui.startLoading(message)
			}
		)
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
