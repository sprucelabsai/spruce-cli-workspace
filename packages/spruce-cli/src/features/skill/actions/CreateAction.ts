import { buildSchema } from '@sprucelabs/schema'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

export const skillCreateActionOptionsDefinition = buildSchema({
	id: 'createSkill',
	name: 'create skill',
	fields: {},
})

export type ActionSchema = typeof skillCreateActionOptionsDefinition

export default class CreateAction extends AbstractFeatureAction {
	public name = 'create'
	public optionsSchema = skillCreateActionOptionsDefinition

	public execute(): Promise<FeatureActionResponse> {
		return Promise.resolve({})
	}
}
