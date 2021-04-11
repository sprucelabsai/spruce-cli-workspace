import { buildSchema } from '@sprucelabs/schema'
import SpruceError from '../../../errors/SpruceError'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

const optionsSchema = buildSchema({
	id: 'logoutAction',
	fields: {},
})
type OptionsSchema = typeof optionsSchema

export default class LogoutAction extends AbstractFeatureAction<OptionsSchema> {
	public code = 'logout'
	public optionsSchema: OptionsSchema = optionsSchema
	public commandAliases = ['logout']

	public async execute(): Promise<FeatureActionResponse> {
		const auth = this.Service('auth')
		const person = auth.getLoggedInPerson()

		if (!person) {
			return {
				errors: [
					new SpruceError({
						code: 'NOT_LOGGED_IN',
					}),
				],
			}
		}

		auth.logOutPerson()

		return {
			summaryLines: ['You have been logged out!'],
		}
	}
}
