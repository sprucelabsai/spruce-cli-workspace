import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import bootSkillOptionsSchema from '#spruce/schemas/spruceCli/v2020_07_22/bootSkillOptions.schema'
import SpruceError from '../../../errors/SpruceError'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

type OptionsSchema = SpruceSchemas.SpruceCli.v2020_07_22.BootSkillOptionsSchema
type Options = SpruceSchemas.SpruceCli.v2020_07_22.BootSkillOptions
export default class BootAction extends AbstractFeatureAction<OptionsSchema> {
	public code = 'boot'
	public optionsSchema: OptionsSchema = bootSkillOptionsSchema
	public async execute(options: Options): Promise<FeatureActionResponse> {
		const command = this.Service('command')

		let script = 'boot'

		if (options.local) {
			script += '.local'
		}

		let runningPromise: any
		let isBooted = false

		const bootPromise = new Promise((resolve, reject) => {
			const runningPromise = command.execute(`yarn ${script}`, {
				onData: (data) => {
					if (!isBooted && data.search(':: Skill booted') > -1) {
						isBooted = true
						resolve(undefined)
					}
				},
			})

			runningPromise.catch((err) => {
				if (err.message.search(/cannot find module/gis) > -1) {
					err = new SpruceError({
						code: 'BOOT_ERROR',
						friendlyMessage:
							'You must build your skill before you can boot it!',
					})
				}

				if (!isBooted) {
					reject(err)
				} else {
					throw err
				}
			})
		})

		await bootPromise

		return {
			meta: {
				kill: command.kill.bind(command),
				pid: command.pid() as number,
				promise: runningPromise,
			},
		}
	}
}
