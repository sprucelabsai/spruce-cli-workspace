import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import onboardActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/onboardOptions.schema'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'
import OnboardFeature from '../OnboardFeature'

type OptionsSchema = SpruceSchemas.SpruceCli.v2020_07_22.OnboardActionSchema
type Options = SpruceSchemas.SpruceCli.v2020_07_22.OnboardAction
export default class ListenAction extends AbstractFeatureAction<SpruceSchemas.SpruceCli.v2020_07_22.OnboardActionSchema> {
	public code = 'onboard'
	public optionsSchema: OptionsSchema = onboardActionSchema

	public async execute(_options: Options): Promise<FeatureActionResponse> {
		const store = this.getParent().OnboardingStore()
		const mode = store.getMode()

		let response = {}

		const player = await this.getParent().ScriptPlayer()

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

	private getParent(): OnboardFeature {
		return this.parent as OnboardFeature
	}
}
