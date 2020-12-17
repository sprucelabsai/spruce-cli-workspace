import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import bootSkillActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/bootSkillAction.schema'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

type OptionsSchema = SpruceSchemas.SpruceCli.v2020_07_22.BootSkillActionSchema
type Options = SpruceSchemas.SpruceCli.v2020_07_22.BootSkillAction
export default class InstallAction extends AbstractFeatureAction<OptionsSchema> {
	public name = 'install'
	public optionsSchema: OptionsSchema = bootSkillActionSchema

	public async execute(options: Options): Promise<FeatureActionResponse> {
		const orgs = await this.Store('organization').fetchMyOrganizations()

		if (orgs.length === 0) {
		}

		const confirm = await this.ui.confirm('')

		return {}
	}
}
