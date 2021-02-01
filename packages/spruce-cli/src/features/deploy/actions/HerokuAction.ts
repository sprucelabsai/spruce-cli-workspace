import { buildSchema, SchemaValues } from '@sprucelabs/schema'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

const optionsSchema = buildSchema({
	id: 'deployHeroku',
	name: 'deploy skill to heroku',
	fields: {
		teamName: {
			type: 'text',
			label: 'team name',
			isRequired: false,
		},
	},
})

type OptionsSchema = typeof optionsSchema
type Options = SchemaValues<OptionsSchema>

export default class DeployAction extends AbstractFeatureAction<OptionsSchema> {
	public code = 'deploy'
	public optionsSchema = optionsSchema

	public commandAliases = ['deploy']

	public async execute(options: Options): Promise<FeatureActionResponse> {
		console.log(options)
		debugger
		const script = diskUtil.resolvePath(process.cwd(), 'shell', 'deploy-heroku')
		console.log(script)
		const results = await this.Service('command').execute(script, {
			args: [options.teamName ?? undefined],
		})
		console.log(results)
		debugger
		return {
			hints: [],
		}
	}
}
