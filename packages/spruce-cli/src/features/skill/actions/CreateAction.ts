import { buildSchema } from '@sprucelabs/schema'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

const optionsSchema = buildSchema({
	id: 'createSkill',
	name: 'create skill',
	fields: {},
})

type OptionsSchema = typeof optionsSchema

export default class CreateAction extends AbstractFeatureAction<OptionsSchema> {
	public code = 'create'
	public optionsSchema = optionsSchema
	public commandAliases = ['create.skill [destination]']

	public async execute(): Promise<FeatureActionResponse> {
		return {
			hints: [
				'This is so much fun! Lets keep moving.',
				`When you're ready to rock, go ahead and run \`spruce setup.vscode\`.`,
			],
		}
	}
}
