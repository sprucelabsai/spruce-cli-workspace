import { eventResponseUtil } from '@sprucelabs/spruce-event-utils'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import setupTestsOptionsSchema from '#spruce/schemas/spruceCli/v2020_07_22/setupTestsOptions.schema'
import mergeUtil from '../../../utilities/merge.utility'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

type OptionsSchema = SpruceSchemas.SpruceCli.v2020_07_22.SetupTestsOptionsSchema
type Options = SpruceSchemas.SpruceCli.v2020_07_22.SetupTestsOptions

export default class SetupAction extends AbstractFeatureAction<OptionsSchema> {
	public code = 'setup'
	public optionsSchema = setupTestsOptionsSchema
	public commandAliases = ['setup.tests']

	public async execute(options: Options): Promise<FeatureActionResponse> {
		const normalizedOptions = this.validateAndNormalizeOptions(options)
		const { demoNumber, skillSlug } = normalizedOptions

		const loginResponse = await this.getFeature('person')
			.Action('login')
			.execute({
				phone: demoNumber,
				pin: demoNumber.substr(demoNumber.length - 4),
			})

		const registerResponse = await this.getFeature('skill')
			.Action('register')
			.execute({ nameReadable: skillSlug, nameKebab: skillSlug })

		const err = registerResponse.errors?.[0]

		const isDuplicateSlugError =
			err?.options?.responseErrors?.length === 1 &&
			err?.options?.responseErrors?.[0]?.options?.code === 'DUPLICATE_SLUG'

		if (isDuplicateSlugError) {
			delete registerResponse.errors
		}

		return mergeUtil.mergeActionResults({}, loginResponse, registerResponse)
	}
}
