import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import bootSkillActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/bootSkillAction.schema'
import SpruceError from '../../../errors/SpruceError'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

type OptionsSchema = SpruceSchemas.SpruceCli.v2020_07_22.BootSkillActionSchema
type Options = SpruceSchemas.SpruceCli.v2020_07_22.BootSkillAction
export default class BootAction extends AbstractFeatureAction<OptionsSchema> {
	public name = 'boot'
	public optionsSchema: OptionsSchema = bootSkillActionSchema
	public async execute(options: Options): Promise<FeatureActionResponse> {
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

		// give skill time to boot
		await new Promise((resolve) => setTimeout(resolve, 5000))

		return {
			meta: {
				kill: command.kill.bind(command),
				pid: command.pid() as number,
				promise,
			},
		}
	}
}
