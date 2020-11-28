import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import onboardActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/onboardAction.schema'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'
import ScriptLoader from '../ScriptLoader'

export default class ListenAction extends AbstractFeatureAction<SpruceSchemas.SpruceCli.v2020_07_22.OnboardActionSchema> {
	public name = 'onboard'
	public optionsSchema: SpruceSchemas.SpruceCli.v2020_07_22.OnboardActionSchema = onboardActionSchema

	public async execute(
		_options: SpruceSchemas.SpruceCli.v2020_07_22.OnboardAction
	): Promise<FeatureActionResponse> {
		const store = this.Store('onboarding')
		const mode = store.getMode()

		let response = {}

		const scriptDir = diskUtil.resolvePath(__dirname, '../scripts')
		const player = await ScriptLoader.LoadScripts({
			ui: this.ui,
			dir: scriptDir,
			onboardingStore: store,
		})

		switch (mode) {
			case 'short':
			case 'immersive':
				await player.playScriptWithKey('onboarding.returning')
				break
			default:
				await player.playScriptWithKey('onboarding.first')
		}

		const stage = store.getStage()

		if (stage) {
			response = {
				headline: `Lets rock!`,
				summaryLines: [
					`Next step: \`spruce ${stage}\``,
					'If stuck: `spruce onboard`',
				],
			}
		} else {
			response = {
				headline: 'Aborted!',
			}
		}

		return response
	}
}
