import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import bootSkillActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/bootSkillAction.schema'
import SpruceError from '../../../errors/SpruceError'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { IFeatureActionExecuteResponse } from '../../features.types'

export default class BootAction extends AbstractFeatureAction<
	SpruceSchemas.SpruceCli.v2020_07_22.IBootSkillActionSchema
> {
	public name = 'boot'
	public optionsSchema: SpruceSchemas.SpruceCli.v2020_07_22.IBootSkillActionSchema = bootSkillActionSchema
	public async execute(
		options: SpruceSchemas.SpruceCli.v2020_07_22.IBootSkillAction
	): Promise<IFeatureActionExecuteResponse> {
		const command = this.Service('command')

		let script = 'boot'

		if (options.local) {
			script += '.local'
		}

		const promise = new Promise((resolve, reject) => {
			const promise = command.execute(`yarn ${script}`)

			promise
				.then((results) => resolve(results))
				.catch((err) => {
					if (err.message.search(/cannot find module/gis) > -1) {
						reject(
							new SpruceError({
								code: 'BOOT_FAILED',
								friendlyMessage:
									'You must build your skill before you can boot it!',
							})
						)
					} else {
						reject(err)
					}
				})
		})

		return {
			meta: {
				kill: command.kill.bind(command),
				pid: command.pid() as number,
				promise,
			},
		}
	}
}
