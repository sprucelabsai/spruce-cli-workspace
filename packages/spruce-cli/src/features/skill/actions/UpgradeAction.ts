import { SchemaValues } from '@sprucelabs/schema'
import { eventResponseUtil } from '@sprucelabs/spruce-event-utils'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import upgradeSkillActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/upgradeSkillOptions.schema'
import SpruceError from '../../../errors/SpruceError'
import InFlightEntertainment from '../../../InFlightEntertainment'
import actionUtil from '../../../utilities/action.utility'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'
import SkillFeature from '../SkillFeature'

type OptionsSchema =
	SpruceSchemas.SpruceCli.v2020_07_22.UpgradeSkillOptionsSchema
type Options = SchemaValues<OptionsSchema>

export default class UpgradeAction extends AbstractFeatureAction<OptionsSchema> {
	public invocationMessage = 'Upgrading your skill... 💪'
	public code = 'upgrade'
	public optionsSchema = upgradeSkillActionSchema
	public commandAliases = ['upgrade', 'update']

	public async execute(options: Options): Promise<FeatureActionResponse> {
		const normalizedOptions = this.validateAndNormalizeOptions(options)
		const generatedFiles = await this.copyFiles(normalizedOptions)

		await this.updateScripts({
			shouldConfirm: normalizedOptions.upgradeMode !== 'forceEverything',
		})

		InFlightEntertainment.start([
			"Let's start the upgrade!",
			'While things are going, see if you can beat 1k points!',
			'Go!!!!',
		])

		await this.reInstallPackageDependencies()

		let results = await this.Executer('skill', 'rebuild').execute({})

		results = actionUtil.mergeActionResults(results, { files: generatedFiles })

		const response = await this.emitter.emit('skill.did-upgrade')
		const { payloads } = eventResponseUtil.getAllResponsePayloadsAndErrors(
			response,
			SpruceError
		)

		for (const p of payloads) {
			results = actionUtil.mergeActionResults(results, p)
		}

		InFlightEntertainment.stop()

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
