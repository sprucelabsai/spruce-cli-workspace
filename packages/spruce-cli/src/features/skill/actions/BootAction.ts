import bootSkillActionSchema from '#spruce/schemas/local/v2020_07_22/bootSkillAction.schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import SpruceError from '../../../errors/SpruceError'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { IFeatureActionExecuteResponse } from '../../features.types'

export default class BootAction extends AbstractFeatureAction<
	SpruceSchemas.Local.v2020_07_22.IBootSkillActionSchema
> {
	public name = 'boot'
	public optionsSchema: SpruceSchemas.Local.v2020_07_22.IBootSkillActionSchema = bootSkillActionSchema
	public async execute(): Promise<IFeatureActionExecuteResponse> {
		const command = this.Service('command')

		try {
			const results = await command.execute('yarn boot')

			return {
				meta: {
					skill: results,
				},
			}
		} catch (err) {
			if (err.message.search(/cannot find module/gis) > -1) {
				throw new SpruceError({
					code: 'BOOT_FAILED',
					friendlyMessage: 'You must build your skill before you can boot it!',
				})
			}

			throw err
		}
	}
}
