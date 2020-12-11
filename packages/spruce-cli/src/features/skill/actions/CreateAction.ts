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
	public name = 'create'
	public optionsSchema = optionsSchema

	public execute(): Promise<FeatureActionResponse> {
		return Promise.resolve({})
	}
}
