import { buildSchema } from '@sprucelabs/schema'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

export const optionsSchema = buildSchema({
	id: 'dashboard',
	name: 'Skill dashboard',
	fields: {},
})

export type DashboardActionDefinition = typeof optionsSchema

export default class DashboardAction extends AbstractFeatureAction<DashboardActionDefinition> {
	public code = 'dashboard'
	public optionsSchema = optionsSchema
	public commandAliases = ['dashboard']

	public async execute(): Promise<FeatureActionResponse> {
		return {
			hints: ['Nothing to see here.'],
		}
	}
}
