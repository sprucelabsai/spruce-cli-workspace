import { buildSchema, SchemaValues } from '@sprucelabs/schema'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'
import { REMOTES } from '../constants'

const optionsSchema = buildSchema({
	id: 'setRemoteOptions',
	description: 'Point your skill to different Mercury environments.',
	fields: {
		remote: {
			label: 'Where should remote point?',
			type: 'select',
			isRequired: true,
			options: {
				choices: [
					{
						value: 'local',
						label: 'Local',
					},
					{
						value: 'dev',
						label: 'Development',
					},
					{
						value: 'sandbox',
						label: 'Sandbox',
					},
					{
						value: 'prod',
						label: 'Production',
					},
				],
			},
		},
	},
})

type OptionsSchema = typeof optionsSchema
type Options = SchemaValues<OptionsSchema>

export default class SyncAction extends AbstractFeatureAction<OptionsSchema> {
	public code = 'setRemote'
	public commandAliases = ['set.remote']
	public optionsSchema: OptionsSchema = optionsSchema
	public invocationMessage = 'Set remote... 🜒'

	public async execute(options: Options): Promise<FeatureActionResponse> {
		const { remote } = this.validateAndNormalizeOptions(options)

		//@ts-ignore
		const host = REMOTES[remote]

		const env = this.Service('env')
		env.set('HOST', host)

		return {
			headline: `Remote set to ${remote}!`,
			summaryLines: [`Host: ${host}`],
		}
	}
}
