import { buildSchema, SchemaValues } from '@sprucelabs/schema'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import eventResponseUtil from '../../event/utilities/eventResponse.utility'
import { FeatureActionResponse } from '../../features.types'

const optionsSchema = buildSchema({
	id: 'loginAction',
	fields: {
		phone: {
			type: 'phone',
			label: 'Phone number (for pin)',
			isRequired: true,
		},
	},
})
type OptionsSchema = typeof optionsSchema
type Options = SchemaValues<OptionsSchema>

export default class LoginAction extends AbstractFeatureAction<OptionsSchema> {
	public name = 'login'
	public optionsSchema: OptionsSchema = optionsSchema

	public async execute(options: Options): Promise<FeatureActionResponse> {
		const { phone } = this.validateAndNormalizeOptions(options)
		let loggedIn = false

		const client = await this.connectToApi()

		const requestPinResults = await client.emit('request-pin', {
			payload: { phone },
		})

		const { challenge } = eventResponseUtil.getFirstResponseOrThrow(
			requestPinResults
		)

		const response: FeatureActionResponse = {}

		do {
			const pin = await this.ui.prompt({
				type: 'text',
				label: 'Pin',
				isRequired: true,
			})

			const confirmPinResults = await client.emit('confirm-pin', {
				payload: { challenge, pin },
			})

			try {
				const { person, token } = eventResponseUtil.getFirstResponseOrThrow(
					confirmPinResults
				)

				const loggedInPerson = { ...person, token }

				this.Store('person').setLoggedInPerson(loggedInPerson)

				loggedIn = true

				response.summaryLines = [`Logged in as ${loggedInPerson.casualName}`]
			} catch (err) {
				this.ui.renderWarning('Oops, bad pin. Try again please! 🙏')
			}
		} while (!loggedIn)

		return response
	}
}