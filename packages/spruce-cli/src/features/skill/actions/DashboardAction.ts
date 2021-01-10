import { buildSchema } from '@sprucelabs/schema'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

export const dashboardActionOptionsDefinition = buildSchema({
	id: 'dashboard',
	name: 'Skill dashboard',
	fields: {},
})

export type DashboardActionDefinition = typeof dashboardActionOptionsDefinition

export default class DashboardAction extends AbstractFeatureAction<DashboardActionDefinition> {
	public code = 'dashboard'
	public optionsSchema = dashboardActionOptionsDefinition
	public commandAliases = ['dashboard']

	public async execute(): Promise<FeatureActionResponse> {
		return {
			hints: ['Nothing to see here.'],
		}
	}
}
