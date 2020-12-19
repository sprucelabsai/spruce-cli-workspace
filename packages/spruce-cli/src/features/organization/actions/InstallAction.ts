import { SelectChoice } from '@sprucelabs/schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import installSkillAtOrganizationActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/installSkillAtOrganizationAction.schema'
import SpruceError from '../../../errors/SpruceError'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

type OptionsSchema = SpruceSchemas.SpruceCli.v2020_07_22.InstallSkillAtOrganizationActionSchema
type Options = SpruceSchemas.SpruceCli.v2020_07_22.InstallSkillAtOrganizationAction
export default class InstallAction extends AbstractFeatureAction<OptionsSchema> {
	public name = 'install'
	public commandAliases = ['install.skill']
	public optionsSchema: OptionsSchema = installSkillAtOrganizationActionSchema

	public async execute(options: Options): Promise<FeatureActionResponse> {
		try {
			const skill = await this.Store('skill').loadCurrentSkill()

			if (!skill.id) {
				throw new SpruceError({ code: 'SKILL_NOT_REGISTERED' })
			}

			let { organizationId } = this.validateAndNormalizeOptions(options)

			if (!organizationId) {
				const orgs = await this.Store('organization').fetchMyOrganizations()

				if (orgs.length === 0) {
					throw new SpruceError({
						code: 'NO_ORGANIZATIONS_FOUND',
					})
				}

				let organizationId: string | undefined
				if (orgs.length === 1) {
					const confirm = await this.ui.confirm(
						`You ready to install your skill at ${orgs[0].name}?`
					)

					if (!confirm) {
						return {}
					}

					organizationId = orgs[0].id
				} else {
					const choices: SelectChoice[] = orgs.map((o) => ({
						value: o.id,
						label: o.name,
					}))

					organizationId = await this.ui.prompt({
						type: 'select',
						label: 'Which organization should we install your skill to?',
						isRequired: true,
						options: {
							choices,
						},
					})
				}

				await this.Store('organization').installSkillAtOrganization(
					skill.id,
					organizationId
				)

				return {
					summaryLines: ['Skill installed!'],
				}
			}
		} catch (err) {
			return {
				errors: [err],
			}
		}

		// const confirm = await this.ui.confirm('')

		return {}
	}
}
