import { buildSchema } from '@sprucelabs/schema'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

const skillCreateActionOptionsDefinition = buildSchema({
	id: 'createSkill',
	name: 'create skill',
	fields: {},
})

type ActionSchema = typeof skillCreateActionOptionsDefinition

export default class CreateAction extends AbstractFeatureAction<ActionSchema> {
	public name = 'create'
	public optionsSchema = skillCreateActionOptionsDefinition

	public execute(): Promise<FeatureActionResponse> {
		return Promise.resolve({})
	}
}
